import { Routes, Route, Navigate } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ProductList from './pages/ProductList/ProductList';
import ProductForm from './pages/ProductForm/ProductForm';
import AdminLogin from './pages/AdminLogin/AdminLogin';


/*eslint-disable*/
function App() {
  return (
    <>
    <Routes>
      {/* Admin Authentication */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
        
        {/* Dashboard/Home Redirect */}
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Route>
      
    </Routes>
    </>
    
  );
}


export default App;