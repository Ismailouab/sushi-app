import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import AddFood from './AddFood';
import UpdateFood from './UpdateFood';
import { useAuth } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
 import '../css/AdminDashboard.css'; // Make sure to style the cards

function AdminDashboard({ onShowInfoClick }) {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState('food'); // Default section
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedFoods, setGroupedFoods] = useState({});

  useEffect(() => {
    // Fetch foods
    axios.get('http://localhost:8000/api/foods')
      .then(response => setFoods(response.data))
      .catch(error => console.error('Error fetching food data:', error));

    // Fetch categories
    axios.get('http://localhost:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching category data:', error));
    
     // Group foods by category once both foods and categories are loaded
     if (foods.length > 0 && categories.length > 0) {
      const grouped = {};
      foods.forEach(food => {
        const category = categories.find(cat => cat.id === food.category_id);
        const categoryName = category ? category.name : "Uncategorized";

        if (!grouped[categoryName]) grouped[categoryName] = [];
        grouped[categoryName].push(food);
      });
      setGroupedFoods(grouped);
    }
    AOS.init({ duration: 1000, offset: 100 });
  }, [foods, categories]);


  return (
    <div>
      <Header onShowInfoClick={onShowInfoClick} />

      {user && (
        <div className="username" data-aos="fade-right">
          <h2 className="name">Welcome,<span className='first'>{user.name}</span> </h2>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="admin-dashboard__breadcrumb" data-aos="fade-right">
        <ul>
          <li
            className={selectedSection === 'food' ? 'active' : ''}
            onClick={() => setSelectedSection('food')}>
              Food
          </li>
          <li 
            className={selectedSection === 'user' ? 'active' : ''}
            onClick={() => setSelectedSection('user')}>
              User
          </li>
        </ul>
      </nav>

      {/* Food Section */}
      {selectedSection === 'food' && (
        <div>
          <h3 className="manage-food__title">Manage Food</h3>
          <button 
            className="manage-food__button"
            onClick={() => setSelectedSection('addFood')}>Add Food</button>

          {/* Display Foods as Cards Grouped by Category */}
            {Object.entries(groupedFoods).map(([category, foods]) => (
              <div key={category} className="food-category">
                <h3 className="category-title"  data-aos="fade-right">{category} :</h3>
                <div className="food-list" data-aos="fade-up">
                  {foods.map(food => (
                    <div key={food.id} className="food-card">
                      <img src={food.image.startsWith('http') ? food.image : `/${food.image.replace("public/", "")}`} 
                      alt={food.name} />
                      <h4>{food.name}</h4>
                      <p><strong>Description:</strong> {food.description}</p>
                      <p><strong>Price:</strong> ${food.price}</p>
                      <p><strong>Rating:</strong> {food.rating}</p>
                      <p><strong>Category:</strong> {category}</p>
                      <button className="edit-btn" onClick={() => setSelectedSection('updateFood')}>Edit</button>
                      <button className="delete-btn" >Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      )}

      {selectedSection === 'addFood' && <AddFood />}
      {selectedSection === 'updateFood' && <UpdateFood />}

      {/* User Section */}
      {selectedSection === 'user' && (
        <div>
          <h3>User Management</h3>
          <p>User management content here</p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
