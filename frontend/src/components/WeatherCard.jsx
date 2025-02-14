import React from "react";
import { CiLocationOn } from "react-icons/ci";

const WeatherCard = ({ city, temperature, weatherCondition, icon }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg flex justify-between items-center">
      <div className="flex items-center">
        {/*<img src="/location.png" alt="Location" className="w-10 mr-4" />*/}
        <CiLocationOn size={'20px'} className='font-bold'/>
        <div>
          <h2 className="text-2xl font-semibold">{city || "Enter a city"}</h2>
          <p>{weatherCondition || "-"}</p>
        </div>
      </div>
      <div className="text-right">
        <h1 className="text-4xl font-bold">{temperature ? `${temperature}°C` : "--°C"}</h1>
        <img src={icon || "/default.png"} alt="Weather Icon" className="w-16" />
      </div>
    </div>
  );
};

export default WeatherCard;