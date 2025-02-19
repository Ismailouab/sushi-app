import React from 'react';
import Header from './Header';
import { useFood } from "../context/FoodContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import '../css/ClientDashboard.css';
import Subscription from './Subscription';


function ClientDashboard({ onShowInfoClick }) {
  const { user} = useAuth()
  const { groupedFoods, loading } = useFood();
  const { 
    order, 
    selectedSection, 
    setSelectedSection,
    handleAddFood, 
    updateQuantity, 
    handleValidateOrder, 
    handleCancelOrder, 
    handleProceedToPayment, 
    handleValidatePayment 
  } = useOrder();
  

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
          <h3 className="manage-food__title" data-aos="fade-right">All Foods</h3>
          <div className="foods-header"> 
            <p className='item' data-aos="fade-left">
              The number of food items selected:
              <span>{order.reduce((total, item) => total + item.quantity, 0)} </span>
            </p>
            <button className="manage-food__button" onClick={handleValidateOrder} data-aos="fade-left">
              Validate Order
            </button>
          </div>

          {loading ? (
            <div className="loading">
              <img src="/assets/infinite-spinner.svg" alt="loading" />
              <p>Loading...</p>
              </div>
            
          ) : (
            Object.entries(groupedFoods).map(([category, foods]) => (
              <div key={category} className="food-category">
                <h3 className="category-title" data-aos="fade-right">
                  {category} :
                </h3>
                <div className="list" data-aos="fade-up">
                  {foods.map((food) => (
                    <div key={food.id} className="card" onClick={() => handleAddFood(food.name, food.price, food.image)}>
                      <img 
                      src={food.image.startsWith("http") ? food.image : `/${food.image.replace("public/", "")}`} 
                      alt={food.name} />
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
          <h3 className="manage-food__title" data-aos="fade-right">Your Order</h3>
          {order.length === 0 ? (
            <div className="loading" data-aos="fade-up">
            <img src="/assets/infinite-spinner.svg" alt="loading" />
            <p>No items in your order.</p>
            </div>
          ) : (
            <div>
              <ul className="order-list" data-aos="fade-up">
                {order.map((item, index) => (
                  <li key={index} className="order-item" data-aos="fade-right">
                    <img src={item.image.startsWith("http") ? item.image : `/${item.image.replace("public/", "")}`} alt={item.food_name} />
                    <span>{item.food_name} - {item.quantity} x ${item.price}</span>
                    <div className="quantity-controls" data-aos="fade-left">
                      <button onClick={() => updateQuantity(item.food_name, 1)}>+</button>
                      <button onClick={() => updateQuantity(item.food_name, -1)}>-</button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="total-price" data-aos="fade-up">
                <p>Total Price: ${order.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
              </div>

              <div className="order-buttons" data-aos="fade-up">
                <button className="manage-food__button" onClick={handleProceedToPayment}>Payer</button>
                <button className="manage-food__button" onClick={handleCancelOrder}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

{selectedSection === "payment" && (
  <div className="payment-section">
    <h3 className="manage-food__title" data-aos="fade-right">Payment</h3>

    {order.length === 0 ? (
      <div className="loading" data-aos="fade-up">
        <img src="/assets/infinite-spinner.svg" alt="loading" />
        <p>No items to pay for.</p>
      </div>
    ) : (
      <div>
        <ul className="order-list" data-aos="fade-up">
          {order.map((item, index) => (
            <li key={index} className="order-item" data-aos="fade-right">
              <img
                src={item.image.startsWith("http") ? item.image : `/${item.image.replace("public/", "")}`}
                alt={item.food_name}
              />
              <span>
                {item.food_name} - {item.quantity} x ${item.price}
              </span>
              <p className="item-total-price" data-aos="fade-left">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="total-price-final" data-aos="fade-up">
          <p className='final-price'>Total Price: ${order.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
        </div>

        <div className="order-buttons" data-aos="fade-up">
          <button className="manage-food__button" onClick={handleValidatePayment}>Validate</button>
          <button className="manage-food__button" onClick={handleCancelOrder}>Cancel</button>
        </div>
      </div>
    )}
  </div>
)}
      <Subscription />
    </div>
  );
}

export default ClientDashboard;