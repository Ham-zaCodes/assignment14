const Product = require("../models/product");

// @desc    Create a product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    // Wrap in data object for frontend consistency
    res.status(201).json({ data: savedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all products (with pagination/search)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { title, category, page = 1, limit = 10 } = req.query;
    const query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (category) query.category = category;

    const skip = (page - 1) * limit;
    const products = await Product.find(query).limit(Number(limit)).skip(skip);
    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: products, // Consistent with your previous frontend logs
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // FIX: Wrap in 'data' object so frontend res.data.data works
    res.status(200).json({ data: product });
  } catch (err) {
    // Return 400 if the ID format is invalid (e.g., too short)
    res.status(400).json({ message: "Invalid ID format" });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ data: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
