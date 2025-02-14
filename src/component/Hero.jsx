import React from 'react'
import '../css/Hero.css';
import  {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Hero({ onLoginClick }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleOrderClick = () => {
        if (user) {
          // If user is logged in, navigate to Dashboard page
          navigate('/client/dashboard');
        } else {
          // If user is not logged in, show the login modal
          onLoginClick();
        }
      };
  return (
    <section className="hero">
        <div className="hero-image"  data-aos="fade-up">
            <img
                src="./assets/sushi-1.png"
                alt="sushi"
                data-aos="fade-up"
            />
            <h2 data-aos="fade-up">
                日 <br />
                本 <br />
                食
            </h2>
            <div className="hero-image__overlay"></div>
        </div>

        <div className="hero-content">
            <div className="hero-content-info" data-aos="fade-left">
                {user && (
                    
                    <h2 className="name">Welcome, <span>{user.name}</span></h2>
                    
                )}
                <h1>Feel the taste of Japanese food</h1>
                <p>
                Feel the taste of the most popular Japanese food from anywhere and
                anytime.
                </p>
                <div className="hero-content__buttons">
                <button 
                    className="hero-content__order-button"  
                    onClick={handleOrderClick}// Use the handleOrderClick function
                > 
                    Order Now 
                </button>
                <button className="hero-content__play-button">
                    <img
                    src="./assets/play-circle.svg"
                    alt="play"
                    />
                    How to Order
                </button>
                </div>
            </div>

            <div className="hero-content__testimonial" data-aos="fade-up">
                <div className="hero-content__customer flex-center">
                <h4>
                    24<span>k+</span>
                </h4>
                <p>happy customers</p>
                </div>
                <div className="hero-content__review">
                <img src="./assets/user.png" alt="user" />
                <p>"This is the best Japanese food delivery service that existed."</p>
                </div>
            </div>
        </div>
  </section>
  )
}

export default Hero