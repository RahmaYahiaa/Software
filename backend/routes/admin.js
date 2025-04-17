// backend/routes/admin.js
const express = require('express');
const router = express.Router();

// Admin verification middleware
// const isAdmin = (req, res, next) => {
//   if (req.user?.role !== 'admin') return res.sendStatus(403);
//   next();
// };

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Optional: set session or JWT
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});


// router.get('/verify', isAdmin, (req, res) => {
//   res.sendStatus(200); // Just verify admin status
// });

// Protected admin endpoints
router.get('/products',  (req, res) => {
  // Return admin-only product data
});
module.exports = router;
