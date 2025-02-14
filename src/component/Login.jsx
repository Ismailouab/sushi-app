import React, { useEffect, useState } from "react";
import '../css/Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { useAuth } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Login({ onClose }) {
    const [showRegister, setshowRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
     // Animation
    useEffect(()=>{
      AOS.init({
        duration: 1000,
        offset: 100,
      });
  },[]);
    const toggleRegisterModal = () => {
        setshowRegister((prevState) => !prevState);
      };
    const closeRegisterModal = () => {
      setshowRegister(false);
    };
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email,
          password
        });
        console.log("Login Response:", response.data);  // Log the entire response data
    
        const user = response.data.user;  // Access the user data from the response



        // Check if user object contains the required fields (role_id and name)
        if (!user || !user.role_id) {
          throw new Error("Role ID is missing in user data");
        }
    
        // Store token and user data
        localStorage.setItem('auth_token', response.data.token);
        const userRole = user.role_id;  // Use role_id directly from user
    
        console.log("Role ID:", userRole);
        // Set user in context
        login(user);
        // Close modal
        onClose();
        // Logic to navigate based on role
        if (userRole === 1) {
          navigate("/admin/dashboard");
        } else if (userRole === 2) {
          navigate("/client/dashboard");
        }
    
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Login failed. Please check your credentials.");
      }
    };
    
  return (
    <div className="login" data-aos="zoom-in">
      <div className="login__container" >
      <button className="login__close" onClick={onClose} >&times;</button>
        <h2 className="login__title" data-aos="fade-down">Login</h2>
        <form className="login__form" onSubmit={handleLogin} data-aos="fade-down">
          {/* Email Input */}
          <div className="login__form-group">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="login__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="login__form-group">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="login__input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login__button" >
            Login
          </button>
          {/* Error message */}
          {errorMessage && <p className="login__error">{errorMessage}</p>}
        </form>

        {/* Register Link */}
        <p className="login__register" data-aos="fade-down">
          Don't have an account?{" "}
          <span
            className="login__link"
            onClick={toggleRegisterModal}
          >
            Sign Up
          </span>
        </p>

        {/* Conditionally Render Register Modal */}
        {showRegister && <Register onCloseRegiter={closeRegisterModal} />}
      </div>
    </div>
  );
}

export default Login;
