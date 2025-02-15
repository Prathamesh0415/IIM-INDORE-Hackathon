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
import CreatePost from "./pages/Forum/Create"
import UpdatePost from "./pages/Forum/Update"
import Post from "./pages/Forum/Post"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Upload from "./pages/Upload";

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
        <Route path='/Login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
        <Route path='/forum' element={<ForumHomePage />} />
        <Route path='/DetectIt' element={<Upload />} />
        <Route path='/forum/createpost/' element={<CreatePost />}/>
        <Route path='/forum/updatepost/:id' element={<UpdatePost />} />
        <Route path='/forum/post/:id' element={<Post />} />
      </Routes>
      <Footer />
      </main>
      
      </div>
      
    
  );
};

export default App;