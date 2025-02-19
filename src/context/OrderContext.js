import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [selectedSection, setSelectedSection] = useState("foods");

  // ✅ Add food to the order
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

  // ✅ Update food quantity
  const updateQuantity = (foodName, amount) => {
    setOrder((prevOrder) =>
      prevOrder
        .map(item =>
          item.food_name === foodName
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // ✅ Validate and place an order
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // ✅ Cancel an order
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
      alert("✅ Order canceled!");
      setSelectedSection("foods");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("❌ Error canceling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  // ✅ Proceed to payment
  const handleProceedToPayment = async () => {
    if (!orderId) {
      alert("No order to update!");
      return;
    }

    const totalPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);

    const updatedOrder = {
      foods: order, 
      total_price: totalPrice,  
      status: "pending", 
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user.id}/orders/${orderId}`,
        updatedOrder,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("✅ Order updated successfully!");
        setSelectedSection("payment");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed to update order.");
      }
    } catch (error) {
      console.error("❌ Error updating order:", error.response ? error.response.data : error);
      alert("Failed to update order. Please try again.");
    }
  };

  // ✅ Validate payment
  const handleValidatePayment = async () => {
    if (orderId === null) return;

    const totalPrice = order.reduce((total, item) => total + item.price * item.quantity, 0);

    const updatedOrder = {
      status: "completed", 
      total_price: totalPrice, 
      foods: order, 
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user.id}/orders/${orderId}`,
        updatedOrder,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("✅ Payment validated! Order is now completed.");
        setOrder([]);
        setOrderId(null);
        setSelectedSection("foods");
        window.scrollTo({ top: 0, behavior: "smooth" }); 
      } else {
        throw new Error("Failed to validate payment.");
      }
    } catch (error) {
      console.error("❌ Error validating payment:", error.response ? error.response.data : error);
      alert("Failed to validate payment. Please try again.");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        orderId,
        selectedSection,
        setSelectedSection,
        handleAddFood,
        updateQuantity,
        handleValidateOrder,
        handleCancelOrder,
        handleProceedToPayment,
        handleValidatePayment
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
