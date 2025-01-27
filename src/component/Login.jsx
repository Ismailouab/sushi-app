import React, { useState } from "react";
import '../css/Login.css'
import Register from "./Register";

function Login({ onClose }) {
    const [showRegister, setshowRegister] = useState(false);
    const toggleRegisterModal = () => {
        setshowRegister((prevState) => !prevState);
      };
      const closeRegisterModal = () => {
        setshowRegister(false);
      };
  return (
    <div className="login" >
      <div className="login__container">
      <button className="login__close" onClick={onClose} >&times;</button>
        <h2 className="login__title">Login</h2>
        <form className="login__form">
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
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login__button">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="login__register">
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
