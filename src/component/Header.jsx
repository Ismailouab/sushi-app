import React, { useEffect, useState } from 'react'
import '../css/Header.css';
import { Link, useLocation  } from 'react-router-dom';
import axios from 'axios';
function Header({ onLoginClick }) {
    const location = useLocation();
    const [foods, setFoods] = useState([]);

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
  return (
    <>
        <header>
            <nav className="header__nav">
                <div className="header__logo">
                <Link to='/'><h4 data-aos="fade-down">Sushiman</h4></Link>
                <div className="header__logo-overlay"></div>
                </div>

                <ul className="header__menu" data-aos="fade-down">
                <li>
                    <a href="#menu" className={location.hash === "#menu" ? "active" : ""}>Menu</a>
                </li>
                <li>
                    <Link to="/food" className={location.pathname === "/food" ? "active" : ""} state={{ foods }}> Food </Link>
                </li>
                <li>
                    <a href="#services" className={location.hash === "#services" ? "active" : ""} > Services</a>
                </li>
                <li>
                    <a  href="#about-us" className={location.hash === "#about-us" ? "active" : ""} > About Us</a>
                </li>
                <li>
                    <button className="header__login" onClick={onLoginClick}>Login</button>
                </li>
                </ul>

                <ul className="header__menu-mobile" data-aos="fade-down">
                <li>
                    <img src="./assets/menu.svg" alt="menu" />
                </li>
                </ul>
            </nav>
        </header>
        
    </>
  )
}

export default Header