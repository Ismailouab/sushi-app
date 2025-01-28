import React, { useEffect, useState } from 'react'
import '../css/Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
function Header({ onLoginClick }) {
    const location = useLocation();
    const [foods, setFoods] = useState([]);
    const { user, logout } = useAuth();
    

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
 
  const handleDashboardClick = (e) => {
    if (!user) {
      e.preventDefault();
      onLoginClick();
    }
  };

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
                      <Link to="/food" className={location.pathname === "/food" ? "active" : ""} state={{ foods }}
                       > Food </Link>
                  </li>
                  <li>
                    <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard') : '#'}
                    className={location.pathname === "/admin/dashboard" || location.pathname === "/client/dashboard" ? "active" : ""}
                    onClick={handleDashboardClick}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus"
                      className={location.pathname === "/aboutus" ? "active" : ""}
                    >
                      About Us
                    </Link>
                  </li>
                  {/* If the user is logged in, show their name and logout button */}
                      {user ? (
                        <>
                          <li>
                            <Link to="/private"
                              className={location.pathname === "/private" ? "active" : ""}
                            >
                              private
                            </Link>
                          </li>
                          <button className="header__logout" onClick={logout}>Logout</button>
                        </>
                      ) : (
                        <li>
                          <button className="header__login" onClick={onLoginClick}>Login</button>
                        </li>
                      )}
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