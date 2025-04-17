import { useState, useEffect } from 'react';
import api from '../../api';
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const res = await api.getProducts();
    setProducts(res.data);
  };

  const handleSubmit = async (formData) => {
    if (editingProduct) {
      await api.updateProduct(editingProduct._id, formData);
    } else {
      await api.createProduct(formData);
    }
    loadProducts();
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    await api.deleteProduct(id);
    loadProducts();
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductForm product={editingProduct} onSubmit={handleSubmit} />
      <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
    </div>
  );
}