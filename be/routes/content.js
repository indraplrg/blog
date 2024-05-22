const express = require("express");
const router = express.Router();
const contentModel = require("../models/content.js");
const authenticateJwt = require("../middlewares/authenticateJwt.js");

router.get("/content", async (req, res) => {
  try {
    const content = await contentModel.find({});
    if (!content) {
      return res.status(404).json({ message: "No data on DB!" });
    }
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/content", authenticateJwt, async (req, res) => {
  const { userId, title, description, author } = req.body;

  if (!userId || !title || !description || !author) {
    return res.status(400).json({ message: "parameter is required!" });
  }

  const lastId = await contentModel.findOne({}).sort({ _id: -1 }).exec();
  const id = lastId ? lastId._id + 1 : 1;

  const content = new contentModel({
    _id: id,
    userId,
    title,
    description,
    author,
    date: Date.now(),
  });

  try {
    await content.save();
    res.status(201).json({ message: "Data recorded!", content });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
