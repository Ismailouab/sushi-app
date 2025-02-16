import React, { useEffect, useState } from "react";
import "../css/Register.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Register({ onCloseRegiter, onClose  }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState(null);
  // Animation
  useEffect(()=>{
    AOS.init({
      duration: 1000,
      offset: 100,
    });
},[]);
  // Handle form input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    

    try {
      // Register the user directly via API call
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed.");
      }

      const data = await response.json();
      localStorage.setItem("auth_token", data.token); // Store the token in localStorage
      
      onCloseRegiter(); // Close the register modal
    } catch (err) {
      setError(err.message); // Show the error message if registration fails
    }
  };

  return (
    <div className="register" >
      <div className="register__container" data-aos="zoom-in">
        <button className="register__close" onClick={onCloseRegiter}>
          &times;
        </button>
        <h2 className="register__title" data-aos="fade-down">Create an Account</h2>
        <form className="register__form" onSubmit={handleSubmit} data-aos="fade-down">
          {/* Name Input */}
          <div className="register__form-group">
            <label htmlFor="name" className="register__label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="register__input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="register__form-group">
            <label htmlFor="email" className="register__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="register__input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="register__form-group">
            <label htmlFor="password" className="register__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="register__input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="register__form-group">
            <label htmlFor="password_confirmation" className="register__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              className="register__input"
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          {/* Error Display */}
            {error && <p className="register__error">{error}</p>}
          {/* Submit Button */}
          <button type="submit" className="register__button">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="register__login" data-aos="fade-down">
          Already have an account?{" "}
          <span>
            <button className="register__link" onClick={onCloseRegiter}>
              Yes
            </button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
