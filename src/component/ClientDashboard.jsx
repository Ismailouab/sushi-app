import React from 'react'
import Header from './Header'
import { useAuth } from '../context/AuthContext';


function ClientDashboard({onShowInfoClick}) {
  const { user } = useAuth();
  
  return (
    <div>
      <Header onShowInfoClick={onShowInfoClick}/>
      {user && (
        <div className="client-dashboard__user-info" data-aos="fade-right">
          <h2 className="name">Hello, {user.name}</h2>
        </div>
      )}

    </div>
  )
}

export default ClientDashboard