import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Products from './pages/products';
import Orders from './pages/orders';
import Suppliers from './pages/suppliers';
import Analysis from './pages/analysis';
import Customers from './pages/customers';
import Inventories from './pages/inventories';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/inventories' element={<Inventories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path='/customers' element={<Customers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
