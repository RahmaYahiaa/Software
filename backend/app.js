const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", userRoutes); 
app.use("/api/products", productRoutes); 

module.exports = app;