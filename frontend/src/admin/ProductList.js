// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewProduct from './ViewProduct';
import EditProduct from './EditProduct';
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
  const [imageFile, setImageFile] = useState(null);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: 0,
    image: ''
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
      image: product.image
    });
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.price <= 0 || product.stock < 0) {
      setMessage('Please enter valid price and stock.');
      return;
    }

    try {
      let imageUrl = product.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');
        formData.append('cloud_name', 'YOUR_CLOUD_NAME');

        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

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
          stock: parseInt(product.stock),
          image: imageUrl
        }),
      });

      if (response.ok) {
        setMessage(showEdit ? 'Product updated successfully!' : 'Product added successfully!');
        setProduct({ name: '', price: '', description: '', category: '', stock: 0, image: '' });
        setImageFile(null);
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
        setProduct({ name: '', price: '', description: '', category: '', stock: 0, image: '' });
        setImageFile(null);
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

      {showView && (
        <ViewProduct 
          product={selectedProduct} 
          onClose={() => setShowView(false)} 
        />
      )}

      {(showForm || showEdit) && (
        <EditProduct 
          product={product}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          imageFile={imageFile}
          showEdit={showEdit}
          showForm={showForm}
          onCancel={() => {
            setShowForm(false);
            setShowEdit(false);
            setSelectedProduct(null);
          }}
          message={message}
        />
      )}
    </div>
  );
}

export default ProductList;
