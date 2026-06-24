import os
import json
import streamlit as st
from dotenv import load_dotenv
from openai import OpenAI
from duckduckgo_search import DDGS

# Load API Key
load_dotenv()

# Helper function to read the model name dynamically from model.txt
def get_model_name():
    filename = "model.txt"
    default_model = "gpt-4o-mini"
    if os.path.exists(filename):
        try:
            with open(filename, "r", encoding="utf-8") as f:
                model_name = f.read().strip().replace('"', '').replace("'", "")
                if model_name:
                    return model_name
        except Exception:
            pass
    return default_model

# Fetch the active model
SELECTED_MODEL = get_model_name()

# Set up Streamlit Page Configuration
st.set_page_config(page_title="AI Chat App + Web Access", page_icon="💬", layout="wide")
st.title("🌐 AI Chat Application with Live Web Access")

# Initialize OpenAI Client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Define System Prompt
SYSTEM_PROMPT = (
    "You are a helpful AI assistant. You have access to a web search tool. "
    "If the user asks about current events, real-time info, or explicitly asks you to search, "
    "use the web search tool to get the latest accurate data before answering."
)

# Initialize tracking metrics in session state
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]
if "total_prompt_tokens" not in st.session_state:
    st.session_state.total_prompt_tokens = 0
if "total_completion_tokens" not in st.session_state:
    st.session_state.total_completion_tokens = 0

# --- TOOL DEFINITION FOR WEB SEARCH ---
def web_search(query: str) -> str:
    """Performs a live web search using DuckDuckGo."""
    try:
        with DDGS() as ddgs:
            results = [r for r in ddgs.text(query, max_results=3)]
            if not results:
                return "No search results found."
            
            formatted_results = []
            for i, r in enumerate(results, 1):
                formatted_results.append(f"[{i}] Source: {r.get('href')}\nTitle: {r.get('title')}\nSnippet: {r.get('body')}\n")
            return "\n".join(formatted_results)
    except Exception as e:
        return f"Error executing web search: {str(e)}"

# Define the structural tool schema
tools = [
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Search the live internet/web for current events, real-time facts, news, and up-to-date data.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The specific search query keywords to look up on the web."
                    }
                },
                "required": ["query"]
            }
        }
    }
]

# --- SIDEBAR: TOKEN & MODEL METRICS PANEL ---
with st.sidebar:
    st.header("📊 Session Token Usage")
    st.info(f"🤖 **Active Model:** {SELECTED_MODEL}")
    
    total_tokens = st.session_state.total_prompt_tokens + st.session_state.total_completion_tokens
    st.metric(label="Total Tokens Spent", value=f"{total_tokens:,}")
    
    col1, col2 = st.columns(2)
    with col1:
        st.metric(label="Input (Prompt)", value=f"{st.session_state.total_prompt_tokens:,}")
    with col2:
        st.metric(label="Output (Reply)", value=f"{st.session_state.total_completion_tokens:,}")
    
    # FIX: Corrected structural assignment of messages history array
    if st.button("Clear Conversation History"):
        st.session_state.messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        st.session_state.total_prompt_tokens = 0
        st.session_state.total_completion_tokens = 0
        st.rerun()

# --- MAIN INTERFACE: CHAT SYSTEM ---
# Safely render existing history, rendering dictionary inputs and native object instances gracefully
for message in st.session_state.messages:
    # If it's an object, check its role attribute; if it's a dict, check the key
    role = message.role if hasattr(message, "role") else message.get("role")
    content = message.content if hasattr(message, "content") else message.get("content")
    has_tool_calls = hasattr(message, "tool_calls") and message.tool_calls
    
    if role not in ["system", "tool"] and not has_tool_calls and content:
        with st.chat_message(role):
            st.markdown(content)

if user_prompt := st.chat_input("Type your message or ask for a web lookup..."):
    with st.chat_message("user"):
        st.markdown(user_prompt)
        
    st.session_state.messages.append({"role": "user", "content": user_prompt})

    with st.chat_message("assistant"):
        try:
            # Step 1: Check if the model wants to use a tool
            response = client.chat.completions.create(
                model=SELECTED_MODEL,
                messages=st.session_state.messages,
                tools=tools,
                tool_choice="auto"
            )
            
            if response.usage:
                st.session_state.total_prompt_tokens += response.usage.prompt_tokens
                st.session_state.total_completion_tokens += response.usage.completion_tokens
            
            response_message = response.choices.message
            
            # Step 2: Handle Tool Execution if requested by the AI
            if response_message.tool_calls:
                # Add the raw message object safely into context
                st.session_state.messages.append(response_message)
                
                for tool_call in response_message.tool_calls:
                    if tool_call.function.name == "web_search":
                        args = json.loads(tool_call.function.arguments)
                        search_query = args.get("query")
                        
                        with st.status(f"🔍 Searching the web for: '{search_query}'...", expanded=False):
                            search_result = web_search(search_query)
                            st.write(search_result)
                        
                        st.session_state.messages.append({
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "name": "web_search",
                            "content": search_result
                        })
                
                # Step 3: Stream the final response using updated context history
                response_stream = client.chat.completions.create(
                    model=SELECTED_MODEL,
                    messages=st.session_state.messages,
                    stream=True,
                    stream_options={"include_usage": True}
                )
            else:
                # If no tool was needed, stream the direct response immediately
                st.session_state.messages.append(response_message)
                response_stream = client.chat.completions.create(
                    model=SELECTED_MODEL,
                    messages=st.session_state.messages,
                    stream=True,
                    stream_options={"include_usage": True}
                )

            # Stream response to interface
            text_placeholder = st.empty()
            full_response = ""
            
            for chunk in response_stream:
                if hasattr(chunk, "choices") and chunk.choices:
                    delta_content = chunk.choices.delta.content
                    if delta_content:
                        full_response += delta_content
                        text_placeholder.markdown(full_response)
                
                if hasattr(chunk, "usage") and chunk.usage is not None:
                    st.session_state.total_prompt_tokens += chunk.usage.prompt_tokens
                    st.session_state.total_completion_tokens += chunk.usage.completion_tokens
            
            # Replace the temporary response object placeholder with the real string response content
            if st.session_state.messages[-1] == response_message and not response_message.tool_calls:
                st.session_state.messages[-1] = {"role": "assistant", "content": full_response}
            else:
                st.session_state.messages.append({"role": "assistant", "content": full_response})
                
            st.rerun()
            
        except Exception as e:
            st.error(f"Failed to process request: {e}")
