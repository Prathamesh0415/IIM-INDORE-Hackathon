
import requests
import sqlite3

# Replace with your actual Google Gemini API Key
GEMINI_API_KEY = "AIzaSyDChqddqY4g5bkp0EKuPyiET-CEL2Q08ws"

# Database setup
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

# Function to chat with Gemini AI
def chat_with_gemini(user_input):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": user_input}]}]
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response_json = response.json()

        if "candidates" in response_json:
            bot_response = response_json["candidates"][0]["content"]["parts"][0]["text"]
        else:
            bot_response = "Sorry, I couldn't understand that."

        # Store conversation in database
        conn, cursor = get_db()
        cursor.execute("INSERT INTO chats (user_input, bot_response) VALUES (?, ?)", (user_input, bot_response))
        conn.commit()
        conn.close()

        return bot_response

    except Exception as e:
        return f"Error: {str(e)}"

# Run chatbot in loop
if __name__ == "__main__":
    print("🚜 Kissan GPT (Powered by Google Gemini) - Type 'exit' to stop 🚜\n")

    while True:
        user_input = input("👨‍🌾 You: ")

        if user_input.lower() == "exit":
            print("👋 Exiting Kissan GPT. See you soon!")
            break

        bot_response = chat_with_gemini(user_input)
        print(f"🤖 Kissan GPT: {bot_response}\n")

