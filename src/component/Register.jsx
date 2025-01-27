import React from "react";
import "../css/Register.css"; 

function Register({ onCloseRegiter }) {
  return (
    <div className="register">
      <div className="register__container">
      <button className="register__close" onClick={onCloseRegiter} >&times;</button>
        <h2 className="register__title">Create an Account</h2>
        <form  className="register__form">
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
              required
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="register__button">Register</button>
        </form>

        {/* Login Link */}
        <p className="register__login">
          Already have an account?{" "}
          <span>
            <button className="register__link" onClick={onCloseRegiter} >Yes</button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
