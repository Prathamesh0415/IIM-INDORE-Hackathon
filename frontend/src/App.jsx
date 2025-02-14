import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import About from "./components/About";
import Forum from "./components/Forum";
import Testimonials from "./components/Testimonials";
import Chatbot from "./pages/Chatbot";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router-dom';
import ForumHomePage from './pages/ForumHomePage'
import MarketplaceHomePage from './pages/MarketplaceHomePage'
import Home from "./pages/Home";
import WeatherApp from "./pages/WeatherApp";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 flex flex-col gap-6 w-full">
        <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/forum' element={<ForumHomePage />} />
        <Route path='/marketplace' element={<MarketplaceHomePage />} />
        <Route path='/Agriweather' element={<WeatherApp/>}/>
        <Route path='/VoiceMitra' element={<Chatbot />}/>
      </Routes>
      <Footer />
      </main>
      
      </div>
      
    
  );
};

export default App;