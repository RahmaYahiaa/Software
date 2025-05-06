const { check, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const zxcvbn = require("zxcvbn");

//  Validate signup input fields
const validateSignup = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("mobile").isMobilePhone().withMessage("Invalid mobile number"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  check("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match"),
  check("gender").isIn(["male", "female"]).withMessage("Gender must be male or female"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({  
        message: "Validation failed",
        errors: errors.array() });
    next();
  }
];

//  Brute force protection for login
const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 5,
//   message: "Too many login attempts from this IP, please try again later.",
handler: (req, res) => {
    return res.status(429).json({
      message: "Too many login attempts from this IP, please try again later."
    });
  }
});

//  Password strength validation
const checkPasswordStrength = (req, res, next) => {
  const { password } = req.body;
  const strength = zxcvbn(password);
  if (strength.score < 2) {
    return res.status(400).json({ message: "Password is too weak. Try a stronger one." });
  }
  next();
};

module.exports = {
    validateSignup,
    loginLimiter,
    checkPasswordStrength,
    };
