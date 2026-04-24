const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use 'exports.' for each function
exports.register = async (req, res) => {
  console.log("HElloo");
  try {
    console.log("Name:", req.body);

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    console.log("User: ", user);

    await user.save();
    console.log("User created");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Erooroohbk");

    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
