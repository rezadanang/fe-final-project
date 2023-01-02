import React from 'react'
import Benefits from './home/Benefits';
import Footer from './home/Footer';
import Hero from './home/Hero';
import NavigationBar from './home/Navigation';
import Navigation from './home/Navigation';
import WhyUs from './home/WhyUs';
import IndexAfterLogin from './IndexAfterLogin';

function Index() {
    const getToken = localStorage.getItem("token");
    if (getToken) {
        return (
            <IndexAfterLogin />
            )
    
      } else { 
        return (
            <>
            <NavigationBar />
            <Hero />
            <WhyUs />
            <Benefits />
            <Footer />
            </>
        )
      }
  
}

export default Index