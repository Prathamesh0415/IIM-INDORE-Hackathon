import React from "react";

const testimonials = [
  { name: "Rajesh Kumar", text: "Krishi has helped me monitor my crops efficiently. The AI detection tool is amazing!", avatar: "👨‍🌾" },
  { name: "Anita Sharma", text: "The market insights provided by Krishi have increased my profits significantly.", avatar: "🌾" },
  { name: "Mohammed Ali", text: "A must-have platform for farmers! Real-time data and expert advice all in one place.", avatar: "🚜" },
];

const Testimonials = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-white rounded-lg shadow-md">
      {testimonials.map((item, index) => (
        <div key={index} className="bg-gray-100 p-5 rounded-md shadow w-80 text-center">
          <div className="text-3xl">{item.avatar}</div>
          <p className="font-bold mt-2">{item.name}</p>
          <p className="mt-2">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;