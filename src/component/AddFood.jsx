import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


function AddFood() {
  const { user, token } = useAuth();
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
      window.location.reload();
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
    <div>
      <h3>Add New Food</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={foodData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={foodData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </label>
        <label>
          Category:
          <select
            name="category_id"
            value={foodData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rating:
          <select name="rating" value={foodData.rating} onChange={handleChange}>
          <option value="">Select Rate</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
          </select>
        </label>
        <button type="submit">Add Food</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AddFood;
