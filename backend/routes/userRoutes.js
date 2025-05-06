const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");
 const { validateSignup, checkPasswordStrength, loginLimiter } = require("../middlewares/securityMiddleware");


router.post("/signup",validateSignup ,checkPasswordStrength,signup);
router.post("/login",loginLimiter, login);
// router.post("/signup",signup);
// router.post("/login", login);
module.exports = router;