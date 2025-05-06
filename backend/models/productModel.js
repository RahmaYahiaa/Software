const mongoose= require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String }, 
  price: { type: Number},
  description: { type: String },
  category: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

 module.exports = mongoose.model("Product", productSchema);

