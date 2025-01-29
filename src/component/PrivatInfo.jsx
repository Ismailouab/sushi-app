import React from 'react'
import { useAuth } from '../context/AuthContext';

function PrivatInfo({ onClose }) {
    const { user } = useAuth();
     // Helper function to format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate) 
      ? parsedDate.toLocaleDateString() 
      : 'Invalid Date';
  };

  return (
    <div  className="modal-overlay"onClick={onClose}>
        <div className="modal-container" >
                <button className="modal-close" onClick={onClose}>
                &times;
                </button>
            {user && (
                <div className="modal-content" data-aos="fade-right">
                      <h2 className="name">Welcome, <span className='first'>{user.name}</span></h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role?.name || 'Unknown'}</p>
                        <p><strong>Joined At:</strong> {formatDate(user.created_at)}</p>
                        <p><strong>Last Updated:</strong> {formatDate(user.updated_at)}</p>
                        <p><strong>Email Verified:</strong> {user.email_verified_at ? 'Yes' : 'No'}</p>
                
                </div>
            )}
        </div>
    </div>
  )
}

export default PrivatInfo