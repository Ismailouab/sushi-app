import React, { useEffect } from 'react'
import '../css/Sections.css'
import '../css/Login.css'
import Header from './Header';
import Hero from './Hero';
import AboutUs from './AboutUs';
import PopularFoods from './PopularFoods';
import Footer from './Footer';
import Subscription from './Subscription';
import Trending from './Trending';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Sections({ onLoginClick }) {
 
    useEffect(()=>{
        AOS.init({
          duration: 1000,
          offset: 100,
        });
    },[]);
    
  return (
    <div>
      <Header onLoginClick={onLoginClick}/>
      <Hero />
      <AboutUs />
      <PopularFoods />
      <Trending /> 
      <Subscription  onLoginClick={onLoginClick}/>
      <Footer />
    </div>
  )
}

export default Sections