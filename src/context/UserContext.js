import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth hook

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { token } = useAuth(); // Get the token from AuthContext
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users excluding admins
  const fetchUsers = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return; // If there's no token, don't attempt to fetch data
    }

    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredUsers = response.data.filter(user => user.role_id !== 1); // Exclude admin users (assuming role_id 1 is admin)
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Fetch users whenever the token changes

  return (
    <UserContext.Provider value={{ users, loading }}>
      {children}
    </UserContext.Provider>
  );
};
