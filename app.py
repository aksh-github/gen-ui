import os
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

# Initialize tracking metrics in session state
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are a helpful AI assistant. You have access to a web search tool. If the user asks about current events, real-time info, or explicitly asks you to search, use the web search tool to get the latest accurate data before answering."}
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
            
            # Format results into a single context snippet
            formatted_results = []
            for i, r in enumerate(results, 1):
                formatted_results.append(f"[{i}] Source: {r.get('href')}\nTitle: {r.get('title')}\nSnippet: {r.get('body')}\n")
            return "\n".join(formatted_results)
    except Exception as e:
        return f"Error executing web search: {str(e)}"

# Define the structural schema so the OpenAI model understands how to invoke the tool
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
    
    if st.button("Clear Conversation History"):
        st.session_state.messages = [{"role": "system", "content": st.session_state.messages[0]["content"]}]
        st.session_state.total_prompt_tokens = 0
        st.session_state.total_completion_tokens = 0
        st.rerun()

# --- MAIN INTERFACE: CHAT SYSTEM ---
for message in st.session_state.messages:
    if message["role"] not in ["system", "tool"] and "tool_calls" not in message:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

if user_prompt := st.chat_input("Type your message or ask for a web lookup..."):
    with st.chat_message("user"):
        st.markdown(user_prompt)
        
    st.session_state.messages.append({"role": "user", "content": user_prompt})

    with st.chat_message("assistant"):
        try:
            # Step 1: Initial call to check if the model wants to use a tool
            # Note: Streaming initial tool choices can complicate parsing, so we fetch the tool routing token packet synchronously.
            response = client.chat.completions.create(
                model=SELECTED_MODEL,
                messages=st.session_state.messages,
                tools=tools,
                tool_choice="auto"
            )
            
            # Record initial usage
            if response.usage:
                st.session_state.total_prompt_tokens += response.usage.prompt_tokens
                st.session_state.total_completion_tokens += response.usage.completion_tokens
            
            response_message = response.choices[0].message
            
            # Step 2: Handle Tool Execution if requested by the AI
            if response_message.tool_calls:
                st.session_state.messages.append(response_message) # Add tool call signature to history
                
                for tool_call in response_message.tool_calls:
                    if tool_call.function.name == "web_search":
                        # Safely extract arguments passed by the model
                        import json
                        args = json.loads(tool_call.function.arguments)
                        search_query = args.get("query")
                        
                        # Show status indicator to user in UI
                        with st.status(f"🔍 Searching the web for: '{search_query}'...", expanded=False):
                            search_result = web_search(search_query)
                            st.write(search_result)
                        
                        # Feed the live web data back into the conversational thread
                        st.session_state.messages.append({
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "name": "web_search",
                            "content": search_result
                        })
                
                # Step 3: Call the model again, now streaming the final compiled answer
                response_stream = client.chat.completions.create(
                    model=SELECTED_MODEL,
                    messages=st.session_state.messages,
                    stream=True,
                    stream_options={"include_usage": True}
                )
            else:
                # If no tool was needed, stream the direct response immediately
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
                    delta_content = chunk.choices[0].delta.content
                    if delta_content:
                        full_response += delta_content
                        text_placeholder.markdown(full_response)
                
                if hasattr(chunk, "usage") and chunk.usage is not None:
                    st.session_state.total_prompt_tokens += chunk.usage.prompt_tokens
                    st.session_state.total_completion_tokens += chunk.usage.completion_tokens
            
            st.session_state.messages.append({"role": "assistant", "content": full_response})
            st.rerun()
            
        except Exception as e:
            st.error(f"Failed to process request: {e}")
