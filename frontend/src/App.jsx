// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Order from './pages/Order';
import Inventory from './pages/Inventory';
import Warehouse from './pages/Warehouse';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          {/* Simple Navigation Menu */}
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
          <Link to="/orders" style={{ marginRight: '10px' }}>Orders</Link>
          <Link to="/inventory" style={{ marginRight: '10px' }}>Inventory</Link>
          <Link to="/warehouses" style={{ marginRight: '10px' }}>Warehouses</Link>
          <Link to="/about">About Us</Link>
        </nav>

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/warehouses" element={<Warehouse />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;