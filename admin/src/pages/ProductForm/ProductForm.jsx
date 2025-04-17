import { useParams } from 'react-router-dom';
import './ProductForm.css'; // Import the CSS file

export default function ProductForm() {
  const { id } = useParams();

  return (
    <div className="product-form-container">
      <h1 className="product-form-title">
        {id ? 'Edit Product' : 'Create New Product'}
      </h1>
      
      {id && <p className="product-form-id">You're editing product ID: {id}</p>}
      
      {/* Your form elements will go here */}
    </div>
  );
}