import React, { useEffect } from 'react';
import Header from './Header';
import PopularFoods from './PopularFoods';
import '../css/AboutUsPage.css'; // CSS file containing the styles
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
function AboutUsPage({ onLoginClick }) {
  useEffect(()=>{
    AOS.init({
      duration: 1000,
      offset: 100,
    });
},[]);


  return (
    <div>
      {/* Header Section */}
      <Header onLoginClick={onLoginClick}/>

      {/* About Us Title */}
      <section className="about-us-title-section" data-aos="zoom-in">
        <h1 className="about-us-title">About Us / 私たちに関しては</h1>
      </section>

      {/* Mission Section */}
      <section className="mission-section" data-aos="zoom-in">
        <hr className="decorative-line" />
        <h2 className="section-title">Our Mission / 私たちの使命</h2>
        <p className="mission-text">
          Our mission is to bring true Japanese flavours to you. We will continue to provide the
          experience of <strong>Omotenashi</strong>, the Japanese mindset of hospitality, with our
          shopping and dining for our customers.
        </p>
        <hr className="decorative-line" />
      </section>

      {/* Story Section */}
      <section className="story-section">
        {/* First Story Block */}
        <div className="story-block" >
          <div className="story-text" data-aos="fade-right">
            <h3>Our Story Begins / 私たちの物語が始まります</h3>
            <p>
              It all started with a passion for Japanese cuisine and the desire to bring authentic
              flavors to our community. From carefully sourcing ingredients to perfecting every
              recipe, our journey has been one of dedication and love for food.
            </p>
          </div>
          <div className="story-image" >
            <img src="/assets/sushi-2.png" alt="Our story begins" data-aos="fade-left"  />
          </div>
        </div>

        {/* Second Story Block */}
        <div className="story-block reverse" >
          <div className="story-image" >
            <img src="/assets/sushi-10.png" alt="Our dedication" data-aos="fade-left" />
          </div>
          <div className="story-text"data-aos="fade-right">
            <h3>A Journey of Dedication / 献身的な旅</h3>
            <p>
              Over the years, we’ve grown to embrace the true spirit of hospitality, serving every
              dish with care and ensuring every guest feels the warmth of Japanese tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Foods Section */}
      <PopularFoods />
      <Footer />
    </div>
  );
}

export default AboutUsPage;
