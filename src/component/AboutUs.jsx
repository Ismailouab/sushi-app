import React from 'react'
import '../css/AboutUs.css';
function AboutUs() {
  return (
    <>
        <section className="about-us" id="about-us">
            <div className="about-us__image">
                <div className="about-us__image-sushi3">
                <img src="./assets/sushi-3.png" alt="sushi" data-aos="fade-right" />
                </div>
                <button className="about-us__button">
                Learn More
                <img src="./assets/arrow-up-right.svg" alt="learn more" />
                </button>
                <div className="about-us__image-sushi2">
                <img src="./assets/sushi-2.png" alt="sushi" data-aos="fade-right" />
                </div>
            </div>
            <div className="about-us__content" data-aos="fade-left">
                <p className="sushi__subtitle">About Us / 私たちに関しては</p>
                <h3 className="sushi__title">Our mission is to bring true Japanese flavours to you.</h3>
                <p className="sushi__description">We will continue to provide the experience of Omotenashi, the Japanese mindset of hospitality, with our shopping and dining for our customers.</p>
            </div>
        </section>
    </>
  )
}

export default AboutUs