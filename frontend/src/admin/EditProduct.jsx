import React from 'react';
import './styles.css';

const EditProduct = ({
  product,
  handleChange,
  handleSubmit,
  showEdit,
  showForm,
  onCancel,
  message
}) => {
  if (!showEdit && !showForm) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onCancel} />

      <div className="edit-modal">
        <form onSubmit={handleSubmit} className="edit-form">
          <h2>{showEdit ? 'Edit Product' : 'Add Product'}</h2>

          <div className="form-grid">
            {/* Left Column */}
            <div className="form-group">
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
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={product.image}
                onChange={handleChange}
              />
            </div>

            {/* Right Column */}
            <div className="form-group">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                required
                step="0.01"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                value={product.stock}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              {showEdit ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
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
