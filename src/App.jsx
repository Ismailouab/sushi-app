import React, { useState } from 'react';
import { Route, Routes ,} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FoodProvider } from "./context/FoodContext";
import { UserProvider } from './context/UserContext';
import Sections from './component/Sections';
import Order from './component/Order';
import Login from './component/Login';
import Register from './component/Register';
import Food from './component/Food';
import CardFood from './component/CardFood';
import AboutUsPage from './component/AboutUsPage';
import AdminDashboard from './component/AdminDashboard'; 
import ClientDashboard from './component/ClientDashboard'; 
import PrivatInfo from './component/PrivatInfo';
import Footer from './component/Footer';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCardFood, setShowCardFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
 //modal login
  const toggleLoginModal = () => {
    setShowLogin((prevState) => !prevState);
  };
  const closeLoginModal = () => {
    setShowLogin(false);
  };
  //modal info
  const toggleInfoModal = () => {
    setShowInfo((prevState) => !prevState);
  };
  const closeInfoModal = () => {
    setShowInfo(false);
  }
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
    <AuthProvider>
      <UserProvider>
        <FoodProvider>
          
            {/* Render the Login modal if showLogin is true */}
            {showLogin && <Login onClose={closeLoginModal} />}
            {/* Render the CardFood modal if showCardFood is true */}
            {showCardFood && <CardFood food={selectedFood} onClose={closeCardFood} />}
            {/* Render the PrivatInfo modal if showInfo is true */}
            {showInfo && <PrivatInfo onClose={closeInfoModal} />}
              <Routes>
                <Route path="/" element={<Sections onLoginClick={toggleLoginModal} onShowInfoClick={toggleInfoModal} />} />
                <Route path="/order" element={<Order />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/food" element={<Food onLoginClick={toggleLoginModal} onConsultClick={toggleCardFood}  onShowInfoClick={toggleInfoModal} />} />
                <Route path="/aboutus" element={<AboutUsPage onLoginClick={toggleLoginModal}  onShowInfoClick={toggleInfoModal}/>}/>
                <Route path="/private" element={<PrivatInfo />} /> 
                <Route path="/admin/dashboard" element={ <AdminDashboard  onShowInfoClick={toggleInfoModal} />} />
                <Route path="/client/dashboard" element={<ClientDashboard  onShowInfoClick={toggleInfoModal}/>} />
              </Routes>
              <Footer onLoginClick={toggleLoginModal} onShowInfoClick={toggleInfoModal} />
          
        </FoodProvider>
        </UserProvider>
    </AuthProvider>
    </>
  );
};

export default App;
