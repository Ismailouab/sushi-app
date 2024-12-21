import React, { useEffect } from 'react'
import '../css/Sections.css'
import Header from './Header';
import Hero from './Hero';
import AboutUs from './AboutUs';
import PopularFoods from './PopularFoods';
import Footer from './Footer';
import Subscription from './Subscription';
import Trending from './Trending';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Sections() {
    useEffect(()=>{
        AOS.init({
          duration: 1000,
          offset: 100,
        });
    },[])
  return (
    <div>
      <Header />
      <Hero />
      <AboutUs />
      <PopularFoods />
      <Trending /> 
      <Subscription /> 
      <Footer />
      

    </div>
  )
}

export default Sections