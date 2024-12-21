import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sections from './component/Sections';
import Order from './component/Order';


const App = () => {
  return (
    <>
      
      <Routes>
        <Route path='/'element={<Sections/>}/>
        <Route path="/order" element={<Order/>} />
      </Routes>
      
    </>
  );
};

export default App;
