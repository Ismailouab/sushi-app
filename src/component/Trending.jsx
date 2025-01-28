import React, { useEffect, useState } from 'react'
import '../css/Trending.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
function Trending() {
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
    <section className="trending" id="food">
    <section className="trending-sushi">
      <div className="trending__content" data-aos="fade-right">
        <p className="sushi__subtitle">What’s Trending / トレンド</p>
        <h3 className="sushi__title">Japanese Sushi</h3>
        <p className="sushi__description">Feel the taste of the most delicious Sushi here.</p>
        <ul className="trending__list flex-between">
          {/* List items */}
          {["Make Sushi", "Oshizushi", "Uramaki Sushi", "Nigiri Sushi", "Temaki Sushi", "Inari Sushi"].map((item, index) => (
            <li key={index}>
              <div className="trending__icon flex-center">
                <img src="./assets/check.svg" alt="check" />
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="trending__image flex-center">
        <img src="./assets/sushi-5.png" alt="sushi-5" data-aos="fade-left" />
        <div className="trending__arrow trending__arrow-left">
          <img src="./assets/arrow-vertical.svg" alt="arrow vertical" />
        </div>
        <div className="trending__arrow trending__arrow-bottom">
          <img src="./assets/arrow-horizontal.svg" alt="arrow horizontal" />
        </div>
      </div>
    </section>
    <div className="trending__discover" data-aos="zoom-in">
      <Link to='/food' state={{ foods }}><p>Discover</p></Link>
    </div>
    <section className="trending-drinks">
      <div className="trending__image flex-center">
        <img src="./assets/sushi-4.png" alt="sushi-4" data-aos="fade-right" />
        <div className="trending__arrow trending__arrow-top">
          <img src="./assets/arrow-horizontal.svg" alt="arrow horizontal" />
        </div>
        <div className="trending__arrow trending__arrow-right">
          <img src="./assets/arrow-vertical.svg" alt="arrow vertical" />
        </div>
      </div>
      <div className="trending__content" data-aos="fade-left">
        <p className="sushi__subtitle">What’s Trending / トレンド</p>
        <h3 className="sushi__title">Japanese Drinks</h3>
        <p className="sushi__description">Feel the taste of the most delicious Japanese drinks here.</p>
        <ul className="trending__list flex-between">
          {/* List items */}
          {["Oruncha", "Sakura Tea", "Aojiru", "Ofukucha", "Kombu-cha", "Mugicha"].map((item, index) => (
            <li key={index}>
              <div className="trending__icon flex-center">
                <img src="./assets/check.svg" alt="check" />
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </section>
  )
}

export default Trending