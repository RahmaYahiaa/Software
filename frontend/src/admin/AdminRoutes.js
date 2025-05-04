// src/admin/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductList from './ProductList';

import Navbar from './Navbar';

function AdminRoutes() {
  return (
    <>
      <Navbar />
      <Routes>        
          <Route path="/" element={<ProductList />} />

      </Routes>
    </>
  );
}

export default AdminRoutes;
