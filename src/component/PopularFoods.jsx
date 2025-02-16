import React, { useEffect, useState } from "react";
import '../css/PopularFoods.css';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  {Link} from 'react-router-dom';
function PopularFoods() {
  const [foods, setFoods] = useState([]);

  // Fetch data from API
  const fetchFoods = async () => {
    axios.get('http://localhost:8000/api/foods')
      .then((response) => {
        console.log('API Response:', response.data); // Check this in the console
        setFoods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching food data:', error);
      });
  };
  useEffect(() => {
    fetchFoods();
  }, []);

  // Slider settings for react-slick
  const settings = {
    dots: false, // Add dots for navigation
    infinite: foods.length > 3, // Only enable infinite scroll if there are enough items
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };


  return (
    <section className="popular-foods" id="menu">
      <h2 className="popular-foods__title" data-aos="flip-up">
        Popular Food / 人気
      </h2>

      <div
        className="popular-foods__filters sushi__hide-scrollbar" data-aos="fade-up">
        <Link to='/food' state={{ foods }}><button className="popular-foods__filters-btn active">All</button></Link>
        {foods.slice(4, 8).map((food, index) => (
          <Link to='/food' state={{ foods }}>
            <button
              key={index}
              className={`popular-foods__filters-btn ${
                index === 0 ? "active" : ""
              }`}
            >
              {food.image && (
                <img src={food.image.startsWith('http') ? food.image : `/${food.image.replace("public/", "")}`} 
                alt={food.name} />
              )}
              {food.name}
           </button>
          </Link>
        ))}
        <Link to='/food' state={{ foods }}><button className="popular-foods__filters-btn">Other</button></Link>
      </div>

    {/* Carousel for food items */}
      <div className="popular-foods__catalogue" data-aos="fade-up">
        <Slider {...settings}>
            {foods.map((food) => (
              <Link to='/food' state={{ foods }}><article key={food.id}className={`popular-foods__card ${food.id === foods[0]?.id }`}>
                <img
                  className="popular-foods__card-image"
                  src={food.image.startsWith('http') ? food.image : `/${food.image.replace("public/", "")}`} // Adjust the image path
                  alt={food.name}
                />
                <h4 className="popular-foods__card-title">{food.name}</h4>

                <div className="popular-foods__card-details flex-between">
                  <div className="popular-foods__card-rating">
                    <img src="./assets/star.svg" alt="star" />
                    <p>{food.rating}</p>
                  </div>

                  <p className="popular-foods__card-price">${food.price}</p>
                </div>
              </article></Link>
            ))}
        </Slider>
      </div>

      <Link to='/food' state={{ foods }} className='link'><button className="popular-foods__button">
        Explore Food
        <img src="./assets/arrow-right.svg" alt="arrow-right" />
      </button></Link>
    </section>
  )
}

export default PopularFoods