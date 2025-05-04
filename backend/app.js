const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
 const cors = require("cors");

const app = express();
app.use(cors())

app.use(express.json());
mongoose.connect(process.env.MONGO_URl).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err.message);
})

app.use("/api", userRoutes); 
app.use("/api/products", productRoutes); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})