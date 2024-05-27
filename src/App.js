import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Game from './Pages/Game';
import Concept from './Pages/Concept';
import Profil from './Pages/Profil';
import Cart from './Pages/Cart';
import Register from './Pages/Register';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import { UserProvider } from './Context/UserContext';




const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Game' element={<Game />} />
          <Route path='/Concept' element={<Concept />} />
          <Route path='/Profil' element={<Profil />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Signin' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/product/:idProduct' element={<ProductDetails />} />
          <Route path='*' element={<Home />} />
        </Routes>

      </BrowserRouter>
    </UserProvider>
  );
};

export default App;