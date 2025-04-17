import { useState ,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    stock: 0,
    image: null
  });

  // Load product data if editing (when id exists)
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => {
          console.error("Failed to load product", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('description', formData.description);
    form.append('stock', formData.stock);
    if (formData.image) form.append('image', formData.image);

    try {
      const url = id ? `/api/products/update/${id}` : '/api/products/create';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: form
      });

      if (!response.ok) throw new Error('Operation failed');
      navigate('/products'); // Redirect to product list
    } catch (error) {
      console.error('Error:', error);
      // Add error notification here
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Product' : 'Create Product'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        type="number"
        label="Price"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
        inputProps={{ min: 0, step: 0.01 }}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        multiline
        rows={4}
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      
      <TextField
        fullWidth
        margin="normal"
        type="number"
        label="Stock Quantity"
        value={formData.stock}
        onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
        inputProps={{ min: 0 }}
      />
      
      <Box sx={{ my: 2 }}>
        <input
          accept="image/*"
          type="file"
          id="product-image"
          onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
        />
      </Box>
      
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Processing...' : 'Save Product'}
      </Button>
    </Box>
  );
}