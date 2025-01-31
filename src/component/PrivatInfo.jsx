import React from 'react'
import { useAuth } from '../context/AuthContext';

function PrivatInfo({ onClose }) {
    const { user } = useAuth();

  return (
    <div  className="modal-overlay"onClick={onClose}>
        <div className="modal-container" >
                <button className="modal-close" onClick={onClose}>
                &times;
                </button>
            {user && (
                <div className="modal-content" data-aos="fade-right">
                      <h2 className="name">Welcome, <span className='first'>{user.name}</span></h2>
                        <p><strong>Username:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role_id=== 1 ? 'Admin' : 'Client'}</p>

                
                </div>
            )}
        </div>
    </div>
  )
}

export default PrivatInfo