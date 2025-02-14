import React, { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import WeatherSearch from "../components/WeatherSearch";
import Recommendations from "../components/Recommendations";
import Alerts from "../components/Alerts";

const API_KEY = "90a04739e7aac13cbe924f6b35ffba98";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [icon, setIcon] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const fetchWeather = async (cityName) => {
    if (!cityName) return alert("Please enter a city name.");
    setCity(cityName);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.cod !== 200) return alert("City not found.");

      setTemperature(Math.round(data.main.temp));
      setWeatherCondition(data.weather[0].main);
      setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

      setRecommendation(getRecommendations(data.weather[0].main));
      setAlertMessage(getWeatherAlerts(data.weather[0].main));
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Error fetching weather data.");
    }
  };

  const getRecommendations = (weather) => {
    if (weather.includes("Rain")) return "🌧 Avoid spraying pesticides as rain may wash them away.";
    if (weather.includes("Clear")) return "☀ A good time to water your crops and apply fertilizers.";
    if (weather.includes("Clouds")) return "🌥 Monitor moisture levels in the soil.";
    if (weather.includes("Snow")) return "❄ Protect crops from extreme cold.";
    return "🌱 Stay updated on weather changes for better farming.";
  };

  const getWeatherAlerts = (weather) => {
    if (weather.includes("Rain")) return "⚠ Heavy rain expected. Secure crops and drainage systems.";
    if (weather.includes("Storm")) return "⛈ Storm alert! Protect crops.";
    if (weather.includes("Heat")) return "🔥 Extreme heat warning. Ensure irrigation.";
    if (weather.includes("Snow")) return "❄ Snowfall warning! Protect plants.";
    return "✅ No weather alerts.";
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <WeatherSearch fetchWeather={fetchWeather} />
        <WeatherCard city={city} temperature={temperature} weatherCondition={weatherCondition} icon={icon} />
        <div className="mt-4">
          <Recommendations city={city} recommendation={recommendation} />
          <Alerts city={city} alertMessage={alertMessage} />
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;