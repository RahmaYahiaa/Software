import React from 'react';
import './styles.css';

function ViewProduct({ product, onClose }) {
  if (!product) return null; // Don't render if no product

  return (
    <>
      <div className="popup-backdrop" onClick={onClose} />
      <div className="popup">
        <h3>Show Product</h3>
        <div className="popup-content">
          <div className="popup-row">
            <span className="popup-label">Name:</span>
            <span className="popup-value">{product.name}</span>
          </div>
          <div className="popup-row">
            <span className="popup-label">Price:</span>
            <span className="popup-value price">${product.price}</span>
          </div>
          <div className="popup-row">
            <span className="popup-label">Description:</span>
            <span className="popup-value">{product.description}</span>
          </div>
          <div className="popup-row">
            <span className="popup-label">Category:</span>
            <span className="popup-value">{product.category}</span>
          </div>
          <div className="popup-row">
            <span className="popup-label">Stock:</span>
            <span className="popup-value">{product.stock}</span>
          </div>
        </div>
        <div className="popup-actions">
          <button 
            onClick={onClose} 
            className="btn btn-secondary ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewProduct;