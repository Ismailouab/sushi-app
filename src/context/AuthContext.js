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
    if (storedToken) {
      // Fetch user data from API or use the token to identify the user
      axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(response => setUser(response.data))
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUser(null); // If there's an issue fetching user data, reset the user state
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('auth_token', userData.token); // Store the token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token'); // Remove the token
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
