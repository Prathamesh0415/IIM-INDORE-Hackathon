import React, { useState } from "react";

const WeatherSearch = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="w-2/3 p-2 border-2 border-gray-300 rounded-lg"
      />
      <button
        onClick={() => fetchWeather(city)}
        className="ml-2 px-4 py-2 bg-green-700 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default WeatherSearch;