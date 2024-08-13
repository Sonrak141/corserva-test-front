import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SaleOrderItems from './pages/SaleOrderItems';
import SaleOrderItemForm from './pages/SaleOrderItemForm';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sale-order-items" element={<SaleOrderItems />} />
      <Route path="/sale-order-items/new" element={<SaleOrderItemForm />} />
      <Route
        path="/sale-order-items/:id/edit"
        element={<SaleOrderItemForm />}
      />
    </Routes>
  </Router>
);

export default App;
