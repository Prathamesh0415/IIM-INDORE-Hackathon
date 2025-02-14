import React from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Forum from '../components/Forum'
import Testimonials from '../components/Testimonials'
import Chatbot from '../components/Chatbot'
//import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        
        <div className="flex flex-row justify-between gap-10">
          <About />
          <Forum />
        </div>
        <Testimonials />
        <Chatbot />
    </div>
  )
}

export default Home