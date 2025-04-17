import axios from 'axios';

export default {
  getProducts: () => axios.get('http://localhost:5000/products'),
  createProduct: (formData) => axios.post('http://localhost:5000/products', formData),
  updateProduct: (id, formData) => axios.put(`http://localhost:5000/products/${id}`, formData),
  deleteProduct: (id) => axios.delete(`http://localhost:5000/products/${id}`)
};
