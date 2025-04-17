import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products'); // Updated endpoint
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      // Add user notification here (e.g., toast/snackbar)
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/delete/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Delete failed');
      loadProducts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button 
        variant="contained" 
        startIcon={<Add />}
        onClick={() => navigate('/products/new')}
        sx={{ mb: 3 }}
      >
        Add Product
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => navigate(`/products/edit/${product._id}`)}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDelete(product._id)}
                  startIcon={<Delete />}
                  color="error"
                >
                  Delete
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}