const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const jwt = require("jsonwebtoken");
const userModel = require("../models/user.js");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or Password is required!" });
  }

  // JWT

  const SECRETKEY = process.env.JWT_SECRET_KEY;

  try {
    // Get User
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = {
      id: user.id,
      username,
      role: "author",
    };

    // Check if user has password
    if (!user.password) {
      return res.status(401).json({ message: "No password set for this user" });
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign(payload, SECRETKEY);
      return res
        .status(200)
        .json({ message: "Login successful", token })
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;

  if (!username || !password) {
    return res
      .status(500)
      .json({ message: "Username or Password is required!" });
  }

  // Hashing Password
  const hashPassword = await bcrypt.hash(password, saltRounds);

  // Get last id
  const lastId = await userModel.findOne({}).sort({ _id: -1 }).exec();
  const id = lastId ? lastId._id + 1 : 1;

  // Create a new Document
  const user = new userModel({
    _id: id,
    username,
    password: hashPassword,
  });

  // Try to save document
  try {
    await user.save();
    res.status(201).json({ message: "Data recorded", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
