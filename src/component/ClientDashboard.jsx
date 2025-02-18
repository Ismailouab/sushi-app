import React , { useState } from 'react'
import Header from './Header'
import { useAuth } from '../context/AuthContext';
import '../css/ClientDashboard.css'

function ClientDashboard({onShowInfoClick}) {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState("foods");
  return (
    <div>
      <Header onShowInfoClick={onShowInfoClick} />

      {user && (
        <div className="username" data-aos="fade-right">
          <h2 className="name">
            Hello,<span className="first">{user.name}</span>
          </h2>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="client-dashboard__breadcrumb" data-aos="fade-right">
        <ul>
          <li
            className={selectedSection === "foods" ? "active" : ""}
            onClick={() => setSelectedSection("foods")}
          >
            Foods
          </li>
          <li
            className={selectedSection === "yourOrder" ? "active" : ""}
            onClick={() => setSelectedSection("yourOrder")}
          >
            Your Order
          </li>
          <li
            className={selectedSection === "payment" ? "active" : ""}
            onClick={() => setSelectedSection("payment")}
          >
            Payment
          </li>
        </ul>
      </nav>

      {/* Render Section Based on Selection */}
      {selectedSection === "foods" && (
        <div className="foods-section">
          <h3>Foods</h3>
          {/* Display food items here */}
        </div>
      )}

      {selectedSection === "yourOrder" && (
        <div className="your-order-section">
          <h3>Your Order</h3>
          {/* Display user's order details here */}
        </div>
      )}

      {selectedSection === "payment" && (
        <div className="payment-section">
          <h3>Payment</h3>
          {/* Display payment section here */}
        </div>
      )}
    </div>
  );
}

export default ClientDashboard;