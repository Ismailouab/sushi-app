import React from 'react'
import '../css/Subscription.css';
import { useAuth } from '../context/AuthContext'; 

function Subscription({ onLoginClick }) {
  const { user} = useAuth();
  return (
    <section className="subscription flex-center" id="services">
        <h2 data-aos="flip-down">Get offers straight to your inbox</h2>
        
        
          
          {user ? (
                <>
                    <h2 className="name">Welcome, <span>{user.name}</span></h2>
                </>
               ) : (
                <>
                  <p data-aos="fade-up">Sign up for the Sushiman newsletter</p>
                    <div className="subscription__form" data-aos="fade-up">
                  <button className="header__login" onClick={onLoginClick}>Login</button>
                  </div> 
                 </>
          )}    
        
  </section>
  )
}

export default Subscription