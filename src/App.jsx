import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sections from './component/Sections';
import Order from './component/Order';
import Login from './component/Login';
import Register from './component/Register';
import Food from './component/Food';
import CardFood from './component/CardFood';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCardFood, setShowCardFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

 //modal login
  const toggleLoginModal = () => {
    setShowLogin((prevState) => !prevState);
  };
  const closeLoginModal = () => {
    setShowLogin(false);
  };
  //modal cardfood
  const toggleCardFood = (food) => {
    setSelectedFood(food);//Store the selected food 
    setShowCardFood((prevState) => !prevState);
  };
  const closeCardFood = () => {
    setSelectedFood(null);//Clear selected food
    setShowCardFood(false);
  };
  return (
    <>
      {/* Render the Login modal if showLogin is true */}
      {showLogin && <Login onClose={closeLoginModal} />}
      {/* Render the CardFood modal if showCardFood is true */}
      {showCardFood && <CardFood food={selectedFood} onClose={closeCardFood} />}

      <Routes>
        <Route path="/" element={<Sections onLoginClick={toggleLoginModal} />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/food" element={<Food onLoginClick={toggleLoginModal} onConsultClick={toggleCardFood} />} />
      </Routes>
    </>
  );
};

export default App;
