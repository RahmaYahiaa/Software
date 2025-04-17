import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AdminRoute.css'; // Import the CSS file

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('/api/admin/verify', {
          credentials: 'include' // Important for session cookies
        });
        
        if (!res.ok) throw new Error('Authentication failed');
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-loading-container">
        <div className="auth-loading-spinner"></div>
        <p className="auth-loading-text">Verifying authentication...</p>
      </div>
    );
  }

  if (error) {
    console.error('Authentication error:', error);
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}