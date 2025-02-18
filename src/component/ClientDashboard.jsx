import React, { useState } from 'react';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { useFood } from "../context/FoodContext";
import axios from 'axios';
import '../css/ClientDashboard.css';
import Subscription from './Subscription';

function ClientDashboard({ onShowInfoClick }) {
  const { user, token } = useAuth();
  const { groupedFoods, loading } = useFood();
  const [selectedSection, setSelectedSection] = useState("foods");
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const handleAddFood = (foodName, foodPrice, foodImage) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find(item => item.food_name === foodName);
      if (existingItem) {
        return prevOrder.map(item =>
          item.food_name === foodName ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrder, { food_name: foodName, quantity: 1, price: foodPrice, image: foodImage }];
      }
    });
  };

  const updateQuantity = (foodName, amount) => {
    setOrder((prevOrder) => {
      return prevOrder
        .map(item => 
          item.food_name === foodName 
          ? { ...item, quantity: item.quantity + amount } 
          : item
        )
        .filter(item => item.quantity > 0); // Remove item if quantity is 0
    });
  };

  const handleValidateOrder = async () => {
    if (order.length === 0) {
      alert("Your order is empty!");
      return;
    }
  
    const orderData = { foods: order, status: "pending" };
  
    try {
      const response = await axios.post(`http://localhost:8000/api/users/${user.id}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderId(response.data.id);
      alert("✅ Order placed successfully!");
      setSelectedSection("yourOrder"); 
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleCancelOrder = async () => {
    if (orderId === null) {
      alert("No order to cancel!");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/users/${user.id}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrder([]);
      setOrderId(null);
      setSelectedSection("foods");
      alert("✅ Order canceled!");
    } catch (error) {
      console.error("❌ Error canceling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  return (
    <div>
      <Header onShowInfoClick={onShowInfoClick} />

      {user && (
        <div className="username" data-aos="fade-right">
          <h2 className="name">
            Hello, <span className="first">{user.name}</span>
          </h2>
        </div>
      )}

      <nav className="client-dashboard__breadcrumb" data-aos="fade-right">
        <ul>
          <li className={selectedSection === "foods" ? "active" : ""} onClick={() => setSelectedSection("foods")}>
            Foods
          </li>
          <li className={selectedSection === "yourOrder" ? "active" : ""} onClick={() => setSelectedSection("yourOrder")}>
            Your Order ({order.length})
          </li>
          <li className={selectedSection === "payment" ? "active" : ""} onClick={() => setSelectedSection("payment")}>
            Payment
          </li>
        </ul>
      </nav>

      {selectedSection === "foods" && (
        <div className="foods-section">
          <h3>All Foods</h3>
          <p>You have selected {order.reduce((total, item) => total + item.quantity, 0)} food items</p>
          <button className="manage-food__button" onClick={handleValidateOrder} data-aos="fade-right">
            Validate Order
          </button>

          {loading ? (
            <p>Loading...</p>
          ) : (
            Object.entries(groupedFoods).map(([category, foods]) => (
              <div key={category} className="food-category">
                <h3 className="category-title" data-aos="fade-right">
                  {category} :
                </h3>
                <div className="list" data-aos="fade-up">
                  {foods.map((food) => (
                    <div key={food.id} className="card" onClick={() => handleAddFood(food.name, food.price, food.image)}>
                      <img src={food.image.startsWith("http") ? food.image : `/${food.image.replace("public/", "")}`} alt={food.name} />
                      <h4 className="popular-foods__card-title">{food.name}</h4>
                      <div className="popular-foods__card-details flex-between">
                        <div className="popular-foods__card-rating">
                          <img src="../assets/star.svg" alt="star" />
                          <p>{food.rating}</p>
                        </div>
                        <p className="popular-foods__card-price">${food.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedSection === "yourOrder" && (
        <div className="your-order-section">
          <h3>Your Order</h3>
          {order.length === 0 ? (
            <p>No items in your order.</p>
          ) : (
            <div>
              <ul className="order-list">
                {order.map((item, index) => (
                  <li key={index} className="order-item">
                    <div className="order-details">
                      <img src={item.image.startsWith("http") ? item.image : `/${item.image.replace("public/", "")}`} alt={item.food_name} className="food-image" />
                      <span>{item.food_name} - {item.quantity} x ${item.price}</span>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.food_name, 1)}>+</button>
                        <button onClick={() => updateQuantity(item.food_name, -1)}>-</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="total-price">
                <p>Total Price: ${order.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
              </div>

              <div className="order-buttons">
                <button className="payer-button" onClick={() => setSelectedSection("payment")}>Payer</button>
                <button className="cancel-button" onClick={handleCancelOrder}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedSection === "payment" && (
        <div className="payment-section">
          <h3>Payment</h3>
          <p>Coming soon...</p>
        </div>
      )}
      <Subscription />
    </div>
  );
}

export default ClientDashboard;
