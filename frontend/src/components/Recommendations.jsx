import React from "react";

const Recommendations = ({ city, recommendation }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold text-lg">Recommendations for {city || "your city"}</h3>
      <p className="mt-2">{recommendation || "🌱 Enter a city to get agricultural tips."}</p>
    </div>
  );
};

export default Recommendations;