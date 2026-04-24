// src/routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Double check this path and the names inside { }
const { register, login } = require("../controllers/authController");

// Line 6 is likely here. Ensure 'register' and 'login' exist above.
router.post("/register", register);
router.post("/login", login);

module.exports = router;
