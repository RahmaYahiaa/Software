
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: 0
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        timeout: 10000
      });
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert(`Delete failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowView(true);
    setShowEdit(false);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
    setShowView(false);
    setShowForm(false);
    setProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
    });
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.price <= 0 || product.stock < 0) {
      setMessage('Please enter valid price and stock.');
      return;
    }

    try {
      const endpoint = showEdit
        ? `http://localhost:5000/api/products/${selectedProduct._id}`
        : 'http://localhost:5000/api/products';

      const method = showEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price),
          stock: parseInt(product.stock)
        }),
      });

      if (response.ok) {
        setMessage(showEdit ? 'Product updated successfully!' : 'Product added successfully!');
        setProduct({ name: '', price: '', description: '', category: '', stock: 0 });
        setShowForm(false);
        setShowEdit(false);
        setSelectedProduct(null);
        fetchProducts();
      } else {
        setMessage('Error submitting product.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="container product-list">
      <h1>Products</h1>
      <button className="btn btn-primary" onClick={() => {
        setShowForm(true);
        setShowEdit(false);
        setShowView(false);
        setSelectedProduct(null);
        setProduct({ name: '', price: '', description: '', category: '', stock: 0 });
      }}>
        Add Product
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">No products available</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleView(product)}>View</button>
                  <button className="btn btn-primary" onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Product */}
      {showView && selectedProduct && (
        <div className="popup">
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Stock:</strong> {selectedProduct.stock}</p>
          <button onClick={() => setShowView(false)} className="btn btn-secondary">Close</button>
        </div>
      )}

      {/* Add or Edit Product Form */}
      {(showForm || showEdit) && (
        <form onSubmit={handleSubmit} className="edit-form">
          <h2>{showEdit ? 'Edit Product' : 'Add Product'}</h2>
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
          <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} />
          <div className="form-actions">
            <button type="submit" className="btn btn-success">{showEdit ? 'Update' : 'Add'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => {
              setShowForm(false);
              setShowEdit(false);
              setSelectedProduct(null);
            }}>
              Cancel
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </form>
      )}
    </div>
  );
}

export default ProductList;
