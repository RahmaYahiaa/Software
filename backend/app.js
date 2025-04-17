const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const admin = require("./routes/admin"); // Import the admin routes
const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Your frontend URL
  credentials: true
}));

app.use(express.json());
app.use('/api/admin', admin);
// Add this admin login route before your other routes

mongoose.connect(process.env.MONGO_URl).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err.message);
});

app.use("/api", userRoutes);  
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});