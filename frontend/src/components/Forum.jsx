import React from "react";

const Forum = () => {
  const discussions = [
    { user: "Pavan", text: "How can I use AI to detect crop diseases?" },
    { user: "Ayush", text: "What are the latest government schemes for small farmers?" },
  ];

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg w-80">
      <h2 className="text-xl text-center border-b-2 pb-2">Forum</h2>
      {discussions.map((item, index) => (
        <div key={index} className="bg-gray-700 p-3 mt-3 rounded-md">
          <p className="font-bold">{item.user}</p>
          <p className="text-sm">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;