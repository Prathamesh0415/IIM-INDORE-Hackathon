import React from "react";

const Sidebar = () => {
  return (
    <nav className="w-64 bg-green-900 text-white h-screen p-5 fixed">
      <div className="logo w-full h-36 bg-contain bg-center bg-no-repeat rounded-lg">
        <img src='frontend\src\assets\logo.png' className="h-[100px] w-[100px]"></img>
      </div>
      <ul className="space-y-4 text-center">
        {["HOME", "DASHBOARD", "DETECT IT", "AGRIWEATHER", "MandiConnect", "VoiceMitra", "Forum", "REGISTER/LOGIN", "CONTACT US"].map((item, index) => (
          <li key={index} className="hover:bg-green-700 py-2 rounded">
            <a href="#" className="block">{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;