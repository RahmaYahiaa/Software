import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductList from './ProductList';
import ViewProduct from './ViewProduct';
import Navbar from './Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

function AdminRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view"
          element={
            <ProtectedRoute>
              <ViewProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
