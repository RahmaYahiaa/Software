import { useNavigate } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file

export default function ProductList() {
  const navigate = useNavigate();

  const handleCreate = () => navigate('/products/new');

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">All Products</h1>
        <button className="new-product-btn" onClick={handleCreate}>
          <span>+</span> New Product
        </button>
      </div>
      
      {/* Your product table will go here */}
    </div>
  );
}