import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch("http://localhost:8000/history");
      const data = await response.json();
      setMessages(data.history.reverse()); // Display from oldest to newest
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { user: input, bot: "..." };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages([...messages, { user: input, bot: data.bot }]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p><strong>👨‍🌾 You:</strong> {msg.user}</p>
            <p><strong>🤖 Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
