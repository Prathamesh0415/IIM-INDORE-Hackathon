import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { user: input, bot: "..." };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch("http://127.0.0.1:8002/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      
      setMessages((prev) => [...prev, { user: input, bot: data.bot }]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4 h-100%">
      {/* Chat Window */}
      <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
        {messages.map((msg, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-md">
            <p className="font-bold">👨‍🌾 You:</p>
            <p>{msg.user}</p>
            <p className="font-bold mt-2">🤖 Bot:</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {msg.bot}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex flex-col mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="border p-2 rounded-lg"
        />
        <button
          className="bg-green-500 w-1/4 rounded-full self-center text-white p-3 mt-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
