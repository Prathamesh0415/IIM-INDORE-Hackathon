import requests
import sqlite3
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load API Key from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["http://localhost:3000"] for specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# SQLite Database Setup
def get_db():
    conn = sqlite3.connect("chat_history.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            bot_response TEXT NOT NULL
        )
    """)
    conn.commit()
    return conn, cursor

# Request Model
class ChatRequest(BaseModel):
    message: str

# Function to Chat with Gemini AI
def chat_with_gemini(user_input: str):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {"contents": [{"parts": [{"text": user_input}]}]}

    try:
        response = requests.post(url, json=data, headers=headers)
        response_json = response.json()
        
        print("🔍 Raw API Response:", response_json)  # Debugging step

        if "candidates" in response_json:
            bot_response = response_json["candidates"][0]["content"]["parts"][0]["text"]
        else:
            bot_response = "Invalid API response."

        return bot_response

    except Exception as e:
        return f"Error: {str(e)}"


# API Route to Chat with AI
@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    ai_response = chat_with_gemini(user_message)
    return {"user": user_message, "bot": ai_response}

# API Route to Fetch Chat History
@app.get("/history")
async def get_chat_history():
    conn, cursor = get_db()
    cursor.execute("SELECT user_input, bot_response FROM chats ORDER BY id DESC LIMIT 10")
    chat_history = [{"user": row[0], "bot": row[1]} for row in cursor.fetchall()]
    conn.close()
    return {"history": chat_history}
