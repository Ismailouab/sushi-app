import React from 'react'
import Header from './Header'
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Header/>
      {user && (
        <div className="admin-dashboard__user-info">
          <h2 className="name">Hello, {user.name}</h2>
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default AdminDashboard