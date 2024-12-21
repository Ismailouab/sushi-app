import React from 'react'
import '../css/Footer.css';
function Footer() {
  return (
    <>
      <footer className="footer flex-between">
        <h3 className="footer__logo">
        <span>Sushi</span>man
        </h3>
        <ul className="footer__nav">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#food">Food</a></li>
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