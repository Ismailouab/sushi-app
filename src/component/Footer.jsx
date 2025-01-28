import React, { useEffect, useState } from 'react'
import '../css/Footer.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
function Footer({ onLoginClick }) {
  const [foods, setFoods] = useState([]);
  const { user} = useAuth();
  const navigate = useNavigate();
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
  const handleLinkClick = (e, route) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation if the user is not logged in
      onLoginClick(); // Show the login modal
    } else {
      navigate(route); // Navigate if the user is logged in
    }
  };
  return (
    <>
      <footer className="footer flex-between">
        <h3 className="footer__logo">
        <Link to='/'><span>Sushi</span>man</Link>
        </h3>
        <ul className="footer__nav">
            <li>
              <a href="#menu" 
                onClick={(e) => handleLinkClick(e, '/menu')} >
                  Menu
              </a>
            </li> 
            <Link to='/food' state={{ foods }}><li><a href="#food">Food</a></li></Link>
            <li>
              <a href="#services"
                onClick={(e) => handleLinkClick(e, '/admin/dashboard')} >
                Dashbord
              </a>
            </li>
            <Link to='/aboutus'><li><a href="#about-us">About Us</a></li></Link>
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