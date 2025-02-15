import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage when app starts
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('auth_token') || null;  // Set token from localStorage
  });
 const navigate = useNavigate();

  // Check if a token exists in localStorage and set the user on app load
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); 
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          logout();
        }
      });
    }
  }, [token]);  // Depend on token here
  console.log(user);
  const login = (userData,userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('auth_token', userToken); // Store the token
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token'); // Remove token
    localStorage.removeItem('user'); // Remove user data
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
