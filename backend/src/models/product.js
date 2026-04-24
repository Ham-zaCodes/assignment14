const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  description: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
