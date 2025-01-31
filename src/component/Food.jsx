import React, { useEffect, useState } from 'react';
import Header from './Header';
import Subscription from './Subscription';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/Food.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Food({ onLoginClick, onConsultClick,onShowInfoClick }) {
  const location = useLocation();
  const foods = location.state?.foods || [];
  const [categories, setCategories] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState(foods);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useAuth(); // Get user authentication state
  const navigate = useNavigate(); // For navigation
  // Fetch categories from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched categories:', data); // Debugging API response

        // Map categories to the format for the select dropdown
        const categoryOptions = data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(categoryOptions);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories. Please try again later.');
      });
  }, []);

  // Filter foods based on the selected category
  const handleCategoryChange = (e) => {
    e.preventDefault(); // Prevent page reload

    const selectedOption = categories.find(
      (category) => category.value === parseInt(e.target.value)
    );
    setSelectedCategory(selectedOption);

    if (!selectedOption) {
      setFilteredFoods(foods); // Show all foods when no category is selected
    } else {
      setFilteredFoods(foods.filter((food) => food.category_id === selectedOption.value));
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
    });
    // Re-initialize AOS when filteredFoods changes
    AOS.refresh(); // This is the key to re-trigger AOS animations on re-render
  }, [filteredFoods]);
  //for the order button
  const handleOrderClick = (food) => {
    if (user) {
      // If the user is logged in, navigate to the Order page and pass the food info
      navigate('/order', { state: { food } });
    } else {
      // If the user is not logged in, show the login modal
      onLoginClick();
    }
  };


  return (
    <div>
      <Header onLoginClick={onLoginClick}   onShowInfoClick={onShowInfoClick}/>
      <section className="food-list">
        {user && (
          <div className="username" data-aos="fade-right">
            <h2 className="name">Welcome, <span className='first'>{user.name}</span></h2>
          </div>
        )}
        <div className="header-container">
          <h2 className="title"data-aos="fade-up">Available Foods /入手可能な食品</h2>
          <div className="category-filter" data-aos="fade-up">
              <select
                value={selectedCategory ? selectedCategory.value : ''}
                onChange={handleCategoryChange}
                className="category-select"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            
          </div>
        </div>
        <div className="food-table-container" data-aos="fade-up">
          <table className="food-table" data-aos="zoom-in">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Rating</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.map((food) => (
                <tr key={food.id}>
                  <td>
                    <img
                      src={food.image.startsWith('http') ? food.image : `/${food.image.replace('public/', '')}`}
                      alt={food.name}
                      className="food-image"
                    />
                  </td>
                  <td>{food.name}</td>
                  <td>{food.description || 'No description available'}</td>
                  <td>{food.rating}</td>
                  <td>${food.price}</td>
                  <td>
                     {/* Show "Order" button only if the user is a client */}
                    {user && user.role_id === 2 && (
                      <button className="food-button" onClick={() => handleOrderClick(food)}>Order</button>
                    )}
                    <button className="food-button" onClick={() => onConsultClick(food)}>
                      Consult
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Subscription onLoginClick={onLoginClick} />
    </div>
  );
}

export default Food;
