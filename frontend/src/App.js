import { Route, Routes } from "react-router";
import MyHome from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";


/*eslint-disable*/
function App() {
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MyHome />} />
          <Route path="/products" element={<Store />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        
          
        </Route>
      </Routes>
    </>
  );
}

export default App;