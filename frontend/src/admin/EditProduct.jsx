import React from 'react';
import './styles.css';

const EditProduct = ({ 
  product,
  handleChange,
  handleSubmit,
  showEdit,
  showForm,  // Add showForm to props
  onCancel,
  message
}) => {
  if (!showEdit && !showForm) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop" onClick={onCancel}></div>
      
      {/* Modal Content */}
      <div className="edit-modal">
        <form onSubmit={handleSubmit} className="edit-form">
          <h2>{showEdit ? 'Edit Product' : 'Add Product'}</h2>
          
          <div className="form-grid">
            <div className="form-info">
              <input 
                type="text" 
                name="name" 
                placeholder="Product Name" 
                value={product.name} 
                onChange={handleChange} 
                required 
              />
              <textarea 
                name="description" 
                placeholder="Description" 
                value={product.description} 
                onChange={handleChange} 
              />
              <input 
                type="text" 
                name="category" 
                placeholder="Category" 
                value={product.category} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-price">
              <input 
                type="number" 
                name="price" 
                placeholder="Price" 
                value={product.price} 
                onChange={handleChange} 
                required 
                step="0.01"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              {showEdit ? 'Update' : 'Add'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default EditProduct;