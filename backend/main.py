from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.services.chatbot_service import ChatbotService

load_dotenv("backend/.env.local", override=True)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    # In production, restrict this to your frontend's domain
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for chatbot instances per session
chatbot_sessions = {}


class ChatRequest(BaseModel):
    message: str
    model_provider: str = "google"  # Default to google
    session_id: str = "default"  # Session ID for chat history


@app.post("/api/chat")
async def chat(request: ChatRequest):
    model_key = request.model_provider

    # Get or create chatbot for this model provider
    if model_key not in chatbot_sessions:
        chatbot_sessions[model_key] = ChatbotService(
            model_provider=request.model_provider)

    chatbot = chatbot_sessions[model_key]
    response = chatbot.get_response(
        request.message, session_id=request.session_id)

    # Print the retrieved context to the console
    print("Retrieved Context:", response["context"])

    return {"response": response["answer"], "context": response["context"]}


@app.post("/api/chat/clear")
async def clear_chat(session_id: str = "default"):
    """Clear chat history for a specific session"""
    # Clear session history from all chatbot instances
    for chatbot in chatbot_sessions.values():
        chatbot.clear_session_history(session_id)
    return {"message": f"Chat history cleared for session: {session_id}"}
