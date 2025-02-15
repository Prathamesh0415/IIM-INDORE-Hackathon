import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="w-64 bg-green-900 text-white h-screen p-5 fixed">
      <div className="logo w-full h-36 bg-contain bg-center bg-no-repeat rounded-lg">
        <img src='frontend\src\assets\logo.png' className="h-[100px] w-[100px]"></img>
      </div>
      <ul className="space-y-4 text-center">
        {["Home", "Dashboard", "DetectIt", "Agriweather", "MandiConnect", "VoiceMitra", "Forum", "Register", "Login", "CONTACT US"].map((item, index) => {
          return <div>
          <Link to={`/${item}`}>
            <li key={index} className="hover:bg-green-700 py-2 rounded">
              <a href="#" className="block">{item}</a>
            </li>
          </Link>
          </div>
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;