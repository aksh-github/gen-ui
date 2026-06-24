import os
import streamlit as st
from dotenv import load_dotenv
from openai import OpenAI

# Load API Key
load_dotenv()

# Helper function to read the model name dynamically from model.txt
def get_model_name():
    filename = "model.txt"
    default_model = "gpt-4o-mini"
    
    if os.path.exists(filename):
        try:
            with open(filename, "file", encoding="utf-8") as f:
                # Read, strip whitespace/newlines, and remove any accidental quotes
                model_name = f.read().strip().replace('"', '').replace("'", "")
                if model_name:
                    return model_name
        except Exception:
            pass # Fall back to default if file reading fails
    return default_model

# Fetch the active model
SELECTED_MODEL = get_model_name()

# Set up Streamlit Page Configuration
st.set_page_config(page_title="AI Chat App + Metrics", page_icon="💬", layout="wide")
st.title("💬 AI Chat")

# Initialize OpenAI Client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize tracking metrics in session state if they don't exist yet
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are a helpful AI assistant built with Streamlit."}
    ]
if "total_prompt_tokens" not in st.session_state:
    st.session_state.total_prompt_tokens = 0
if "total_completion_tokens" not in st.session_state:
    st.session_state.total_completion_tokens = 0

# --- SIDEBAR: TOKEN & MODEL METRICS PANEL ---
with st.sidebar:
    st.header("📊 Session Token Usage")
    
    # Visual anchor showing the active model read from the file
    st.info(f"🤖 **Active Model:** {SELECTED_MODEL}")
    st.write("Track the total cost and token spend for this chat session:")
    
    # Calculate total tokens consumed
    total_tokens = st.session_state.total_prompt_tokens + st.session_state.total_completion_tokens
    
    # Render interactive scannable metrics
    st.metric(label="Total Tokens Spent", value=f"{total_tokens:,}")
    
    col1, col2 = st.columns(2)
    with col1:
        st.metric(label="Input (Prompt)", value=f"{st.session_state.total_prompt_tokens:,}")
    with col2:
        st.metric(label="Output (Reply)", value=f"{st.session_state.total_completion_tokens:,}")
    
    # Quick clear button
    if st.button("Clear Conversation History"):
        st.session_state.messages = [{"role": "system", "content": "You are a helpful AI assistant built with Streamlit."}]
        st.session_state.total_prompt_tokens = 0
        st.session_state.total_completion_tokens = 0
        st.rerun()

# --- MAIN INTERFACE: CHAT SYSTEM ---
# Render existing conversation history (skipping the system prompt)
for message in st.session_state.messages:
    if message["role"] != "system":
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

# Accept user input from the chat box
if user_prompt := st.chat_input("Type your message here..."):
    
    # Display user message in the UI
    with st.chat_message("user"):
        st.markdown(user_prompt)
        
    # Save user message to session history
    st.session_state.messages.append({"role": "user", "content": user_prompt})

    # Generate assistant response
    with st.chat_message("assistant"):
        try:
            # Call OpenAI API with stream options enabled using the dynamic model
            response_stream = client.chat.completions.create(
                model=SELECTED_MODEL,
                messages=st.session_state.messages,
                stream=True,
                stream_options={"include_usage": True} 
            )
            
            # Use an empty container to hold the streaming content safely
            text_placeholder = st.empty()
            full_response = ""
            
            # Iterate manually over the stream chunks to catch the usage packet
            for chunk in response_stream:
                # FIX: Check if chunk.choices is present AND contains at least one item
                if hasattr(chunk, "choices") and chunk.choices:
                    delta_content = chunk.choices[0].delta.content
                    if delta_content:
                        full_response += delta_content
                        text_placeholder.markdown(full_response)
                
                # Capture token counts (OpenAI appends this packet to the end of the stream)
                if hasattr(chunk, "usage") and chunk.usage is not None:
                    # Update global counters in session state
                    st.session_state.total_prompt_tokens += chunk.usage.prompt_tokens
                    st.session_state.total_completion_tokens += chunk.usage.completion_tokens

                
                if hasattr(chunk, "usage") and chunk.usage is not None:
                    st.session_state.total_prompt_tokens += chunk.usage.prompt_tokens
                    st.session_state.total_completion_tokens += chunk.usage.completion_tokens
            
            # Save final response text to history
            st.session_state.messages.append({"role": "assistant", "content": full_response})
            st.rerun()
            
        except Exception as e:
            st.error(f"Failed to generate response: {e}")
