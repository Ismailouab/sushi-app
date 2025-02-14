import React, { useEffect, useState } from 'react'
import '../css/Footer.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
function Footer({ onLoginClick,onShowInfoClick }) {
  const [foods, setFoods] = useState([]);
  const { user} = useAuth();
  const location = useLocation();

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:8000/api/foods')
      .then((response) => {
        console.log('API Response:', response.data); // Check this in the console
        setFoods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching food data:', error);
      });
  }, []);    
  const handlePrivateClick = (e) => {
      e.preventDefault(); // Prevent navigation
      onShowInfoClick();  // Open the modal
  };
  return (
    <>
      <footer className="footer flex-between">
        <h3 className="footer__logo">
          <Link to='/'
            onClick={(e) => {
               if (window.location.pathname === "/") {
                  e.preventDefault(); // Prevent default navigation
                  window.location.reload(); // Force page refresh
                }
            }}>
            <span>Sushi</span>man
          </Link>
        </h3>
        <ul className="footer__nav">
             
            <Link to='/food' state={{ foods }}><li><a href="#food">Food</a></li></Link>
            <li>
              <Link 
                        to={user?.role_id === 1 ? '/admin/dashboard' : '/client/dashboard'} 
                        className={location.pathname.includes("/dashboard") ? "active" : ""}
                        onClick={(e) => {
                          if (!user) {
                            e.preventDefault(); // Prevent navigation if no user
                            onLoginClick();
                          }
                        }}
                      >
                        Dashboard
              </Link>
            </li>
            <Link to='/aboutus'><li><a href="#about-us">About Us</a></li></Link>
            {user ? (
                        <>
                          <li>
                            <a href="#" className={location.pathname === "/private" ? "active" : ""} 
                              onClick={handlePrivateClick}>
                              Private
                            </a>
                          </li>

                        </>
                      ) : (
                        console.log('user not logged in')
                      )}
        </ul>
        <ul className="footer__social">
            <li className="flex-center">
                <img src="/assets/facebook.svg" alt="facebook"/>
            </li>
            <li className="flex-center">
                <img src="/assets/instagram.svg" alt="facebook"/>
            </li>
            <li className="flex-center">
                <img src="/assets/twitter.svg" alt="facebook"/>
            </li>
        </ul>
  </footer>
    </>
  )
}

export default Footer