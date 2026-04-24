const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getProducts,
  getProductById, // 1. Add this import
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById); // 2. Add this route (Public or Protected based on your need)
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
