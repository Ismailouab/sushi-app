import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFood } from "../context/FoodContext"; 
import "../css/AddFood.css";
import '../css/AboutUs.css';

function AddFood({setSelectedSection}) {
  const { user, token } = useAuth();
  const {fetchData} = useFood();
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    rating: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data); // Assuming the API returns categories
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFoodData({
      ...foodData,
      image: e.target.files[0], // Set the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add food.");
      return;
    }

    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    const formData = new FormData(); // To handle the file upload
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("price", foodData.price);
    formData.append("image", foodData.image); // Image file
    formData.append("category_id", foodData.category_id);
    formData.append("rating", foodData.rating);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${user.id}/foods`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // For file uploads
          },
        }
      );
      console.log("✅ Food added successfully:", response.data);
      fetchData(); // Reload the food list
      setSelectedSection({ section: "food", foodId: null })
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("❌ Error adding food:", err);

      if (err.response) {
        console.log("📌 Error response data:", err.response.data);
        setError("There was an error adding the food.");
      } else if (err.request) {
        console.log("📌 Error request:", err.request);
        setError("Network error. Please try again.");
      } else {
        console.log("📌 Error message:", err.message);
        setError("There was an error adding the food.");
      }
    }
  };

  return (
    <div className="about-us" id="about-us" >
    <div className="admin-dashboard__form-container" data-aos="fade-right">
      <h3 className="AddFood__title">Add New Food</h3>
      <form onSubmit={handleSubmit} className="admin-dashboard__form">
        <div className="admin-dashboard__form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            className="admin-dashboard__input"
          />
        </div>

        <div className="admin-dashboard__form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={foodData.description}
            onChange={handleChange}
            className="admin-dashboard__textarea"
          />
        </div>

        <div className="admin-dashboard__form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={foodData.price}
            onChange={handleChange}
            className="admin-dashboard__input"
          />
        </div>

        <div className="admin-dashboard__form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="admin-dashboard__input"
          />
        </div>

        <div className="admin-dashboard__form-group">
          <label>Category:</label>
          <select
            name="category_id"
            value={foodData.category_id}
            onChange={handleChange}
            className="admin-dashboard__select"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-dashboard__form-group">
          <label>Rating:</label>
          <select
            name="rating"
            value={foodData.rating}
            onChange={handleChange}
            className="admin-dashboard__select"
          >
            <option value="">Select Rate</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-dashboard__form-actions">
          <button type="submit" className="manage-food__button">
            Add Food
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSection({ section: "food", foodId: null });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="manage-food__button"
          >
            Cancel
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
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

export default AddFood;