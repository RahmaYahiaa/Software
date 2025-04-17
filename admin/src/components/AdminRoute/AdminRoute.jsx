import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AdminRoute.css'; // Import the CSS file

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // تحقق من تسجيل الدخول باستخدام localStorage بدلاً من API
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    if (isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setError('You are not authenticated');
    }

    setLoading(false);
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
