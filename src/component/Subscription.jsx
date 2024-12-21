import React from 'react'
import '../css/Subscription.css';
function Subscription() {
  return (
    <section className="subscription flex-center" id="services">
        <h2 data-aos="flip-down">Get offers straight to your inbox</h2>
        <p data-aos="fade-up">Sign up for the Sushiman newsletter</p>
        <div className="subscription__form" data-aos="fade-up">
        <input type="text" placeholder="enter your email address" />
        <button>Get Started</button>
        </div>
  </section>
  )
}

export default Subscription