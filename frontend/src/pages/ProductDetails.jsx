import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/action/cartCounterAction';
import Swal from 'sweetalert2';
import { StarFill, StarHalf } from 'react-bootstrap-icons';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.handleCart);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/products');
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Product Not Found',
          text: 'The requested product does not exist or may have been removed',
          confirmButtonText: 'Back to Products'
        }).then(() => navigate('/products'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    dispatch(addCart(product));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  };

  const renderRatingStars = (rating) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarFill key={i} className="text-warning me-1" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="text-warning me-1" />);
      } else {
        stars.push(<StarFill key={i} className="text-secondary me-1" />);
      }
    }

    return (
      <div className="d-flex align-items-center mb-3">
        {stars}
        <span className="text-muted ms-2">
          ({product.rating?.count || 0} reviews)
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <h3 className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Product Not Found
            </h3>
            <p className="lead mb-4">
              We couldn't find the product you're looking for
            </p>
            <button 
              className="btn btn-primary px-4"
              onClick={() => navigate('/products')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4 d-flex justify-content-center align-items-center">
                <img
                  src={product.image || '/images/product-placeholder.jpg'}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.src = '/images/product-placeholder.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <span className="badge bg-secondary mb-2">
                  {product.category}
                </span>
                <h1 className="mb-3 fw-bold">{product.name}</h1>
                
                {renderRatingStars(product.rating?.rate)}
                
                <div className="d-flex align-items-center mb-4">
                  <h3 className="text-primary fw-bold mb-0">
                    ${product.price?.toFixed(2)}
                  </h3>
                  {product.originalPrice && (
                    <small className="text-decoration-line-through text-muted ms-2">
                      ${product.originalPrice.toFixed(2)}
                    </small>
                  )}
                </div>
                
                <p className="lead text-muted mb-4">{product.description}</p>
                
                <div className="d-flex flex-wrap gap-3 mt-auto">
                  <button
                    className="btn btn-primary px-4 py-2 fw-bold flex-grow-1"
                    onClick={handleAddToCart}
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Add to Cart
                  </button>
                  
                  <NavLink
                    to="/cart"
                    className="btn btn-outline-primary px-4 py-2 fw-bold flex-grow-1"
                  >
                    <i className="bi bi-cart-check me-2"></i>
                    View Cart ({cartItems.reduce((total, item) => total + item.qty, 0)})
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}