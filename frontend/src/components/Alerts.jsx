import React from "react";

const Alerts = ({ city, alertMessage }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold text-lg">Notifications & Alerts for {city || "your city"}</h3>
      <p className="mt-2">{alertMessage || "⚠ Weather alerts will appear here."}</p>
    </div>
  );
};

export default Alerts;