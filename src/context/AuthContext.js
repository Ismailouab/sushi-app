// src/context/AuthContext.js
import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Create context
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // Check if a token exists in localStorage and set the user on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
  
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user immediately
  
      axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then(response => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Ensure data is up to date
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          logout(); // Only logout if unauthorized
        }
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('auth_token', userData.token); // Store the token
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token'); // Remove the token
    localStorage.removeItem('user'); // Remove user data
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
