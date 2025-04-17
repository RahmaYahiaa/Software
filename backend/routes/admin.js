// backend/routes/admin.js
const express = require('express');
const router = express.Router();

// Admin verification middleware
const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.sendStatus(403);
  next();
};

router.post('/login', (req, res) => {
  // Validate admin credentials
});

router.get('/verify', isAdmin, (req, res) => {
  res.sendStatus(200); // Just verify admin status
});

// Protected admin endpoints
router.get('/products', isAdmin, (req, res) => {
  // Return admin-only product data
});