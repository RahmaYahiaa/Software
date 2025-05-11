const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const helmet = require("helmet"); // ✅ مكتبة الحماية Helmet
const xss = require("xss"); // ✅ مكتبة الحماية من XSS

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet()); // ✅ تفعيل Helmet

// ✅ راوت لاختبار XSS
app.post("/test", (req, res) => {
  const { comment } = req.body;
  const sanitized = xss(comment);
  res.json({ sanitized });
});

// ✅ راوت لاختبار Helmet headers
app.get("/helmet-test", (req, res) => {
  res.send("Helmet headers are active.");
});

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
