import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFood } from "../context/FoodContext";
import "../css/AddFood.css";
import "../css/AboutUs.css";

function UpdateFood({ setSelectedSection, foodId }) {
  const { user, token } = useAuth();
  const { fetchData } = useFood(); // Fetch latest food data after update
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    rating: "",
  });
  const [categories, setCategories] = useState([]); // Store categories
  // Fetch food data when component mounts
  useEffect(() => {
    if (!foodId) return; // Ensure foodId is available
  
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/foods/${foodId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Ensure response data structure matches the initial state
        setFoodData({
          name: response.data.name || "",
          description: response.data.description || "",
          price: response.data.price || "",
          image: "", // Reset file input field
          category_id: response.data.category_id || "",
          rating: response.data.rating || "",
        });
  
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchFood();
    fetchCategories();
  }, [foodId, user.id,token]);

  // Handle input changes
  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/users/${user.id}/foods/${foodId}`,
        foodData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Food updated successfully!");
      fetchData(); // Reload food list
      setSelectedSection({ section: "food", foodId: null });// Go back to the food list
      window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top
    } catch (error) {
      console.error("❌ Error updating food:", error);
      alert("Failed to update food. Please try again.");
    }
  };

  return (
    <div className="about-us" id="about-us">
      <div className="admin-dashboard__form-container" data-aos="fade-right">
        <h3 className="AddFood__title">Update Food</h3>
        <form onSubmit={handleSubmit} className="admin-dashboard__form">
          <div className="admin-dashboard__form-group">
            <label>Name:</label>
            <input type="text" name="name" 
              value={foodData.name} onChange={handleChange} required className="admin-dashboard__input" />
          </div>
          
          <div className="admin-dashboard__form-group">
            <label>Description:</label>
            <textarea name="description" 
            value={foodData.description} onChange={handleChange} required  className="admin-dashboard__textarea"/>
          </div>

          <div className="admin-dashboard__form-group">
            <label>Price:</label>
            <input type="number" name="price" 
            value={foodData.price} onChange={handleChange} required   className="admin-dashboard__input"/>
          </div>

          <div className="admin-dashboard__form-group">
              <label>Image URL:</label>
              <input type="text" name="image" 
              value={foodData.image} onChange={handleChange} className="admin-dashboard__input" />
          </div>

          <div className="admin-dashboard__form-group">
          <label>Category:</label>
          <select name="category_id" 
            className="admin-dashboard__select" value={foodData.category_id} onChange={handleChange} required>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          </div>

          <div className="admin-dashboard__form-group">
            <label>Rating:</label>
            <select name="rating" className="admin-dashboard__select"
            value={foodData.rating} onChange={handleChange} required>
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-dashboard__form-actions">
            <button type="submit" className="manage-food__button" 
            >Update Food</button>
            <button type="button" className="manage-food__button"
            onClick={() =>  {
              setSelectedSection({ section: "food", foodId: null });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
        <div className="about-us__image">
                <div className="about-us__image-sushi3">
                <img src="/assets/sushi-3.png" alt="sushi" data-aos="fade-left" />
              </div>
              <div className="about-us__image-sushi2">
                <img src="/assets/sushi-2.png" alt="sushi" data-aos="fade-left" />
              </div>
        </div>
    </div>
  );
}

export default UpdateFood;
