import React from 'react'
import '../css/Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <>
      <footer className="footer flex-between">
        <h3 className="footer__logo">
        <Link to='/'><span>Sushi</span>man</Link>
        </h3>
        <ul className="footer__nav">
            <li><a href="#menu">Menu</a></li>
            <Link to='/food'><li><a href="#food">Food</a></li></Link>
            <li><a href="#services">Services</a></li>
            <li><a href="#about-us">About Us</a></li>
        </ul>
        <ul className="footer__social">
            <li className="flex-center">
                <img src="./assets/facebook.svg" alt="facebook"/>
            </li>
            <li className="flex-center">
                <img src="./assets/instagram.svg" alt="facebook"/>
            </li>
            <li className="flex-center">
                <img src="./assets/twitter.svg" alt="facebook"/>
            </li>
        </ul>
  </footer>
    </>
  )
}

export default Footer