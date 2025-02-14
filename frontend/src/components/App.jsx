import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import About from "./components/About";
import Forum from "./components/Forum";
import Testimonials from "./components/Testimonials";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 flex flex-col gap-6 w-full">
        <Header />
        <div className="flex flex-row justify-between gap-10">
          <About />
          <Forum />
        </div>
        <Testimonials />
        <Chatbot />
        <Footer />
      </main>
    </div>
  );
};

export default App;