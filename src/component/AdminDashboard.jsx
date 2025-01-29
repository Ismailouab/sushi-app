import React, { useEffect } from 'react'
import Header from './Header'
import { useAuth } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
function AdminDashboard({onShowInfoClick}) {
  const { user } = useAuth();
  useEffect(()=>{
    AOS.init({
      duration: 1000,
      offset: 100,
    });
    AOS.refresh({
      duration: 1000,
      offset: 100,
    }); 
},[]);
  return (
    <div>
      <Header onShowInfoClick={onShowInfoClick}/>
      {user && (
        <div className="admin-dashboard__user-info" data-aos="fade-right">
          <h2 className="name">Welcome, {user.name}</h2>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard