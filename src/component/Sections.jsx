import React, { useEffect } from 'react'
import '../css/Sections.css'
import '../css/Login.css'
import Header from './Header';
import Hero from './Hero';
import AboutUs from './AboutUs';
import PopularFoods from './PopularFoods';
import Subscription from './Subscription';
import Trending from './Trending';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Sections({ onLoginClick ,onShowInfoClick}) {
 
    useEffect(()=>{
        AOS.init({
          duration: 1000,
          offset: 100,
        });
        AOS.refresh({
          duration: 1000,
          offset: 100,
        }); 
    },[]);
    
  return (
    <div>
      <Header onLoginClick={onLoginClick} onShowInfoClick={onShowInfoClick}/>
      <Hero  onLoginClick={onLoginClick} />
      <AboutUs />
      <PopularFoods />
      <Trending /> 
      <Subscription  onLoginClick={onLoginClick}/>
    </div>
  )
}

export default Sections