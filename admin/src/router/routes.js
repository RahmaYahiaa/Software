// admin/src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import ProductRoutes from './ProductRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/*" element={<ProductRoutes />} />
    </Routes>
  );
}

// admin/src/routes/ProductRoutes.tsx
export default function ProductRoutes() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route path="/products/edit/:id" element={<ProductForm />} />
      <Route path="/" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}