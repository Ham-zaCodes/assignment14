const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 1. Import Routes
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// 2. Define API Routes
// These must match the assignment's expected endpoints
app.use("/api/auth", authRoutes); // Handles /register and /login
app.use("/api/products", productRoutes); // Handles product CRUD

// Base Route for testing
app.get("/", (req, res) => {
  res.send("Auth & Product CRUD API is running...");
});

// 3. Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 4. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
