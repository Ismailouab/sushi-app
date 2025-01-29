import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { useAuth } from '../context/AuthContext';


function Order() {
  const { user } = useAuth();
  return (
    <div>
      
      <Header/>
      {user && (
        <div className="admin-dashboard__user-info">
          <h2 className="name">Welcome, {user.name}</h2>
        </div>
      )}
    </div>
  )
}

export default Order