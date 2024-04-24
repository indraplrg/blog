const express = require("express");
const db = require("../database/connection.js");
const router = express.Router();

router.post("/user", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Username is required" });
  }

  const sql = "INSERT INTO user (name) VALUES (?)";
  const values = [name];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error recording data:", error);
      return res.status(500).json({ message: "Failed to record data" });
    } else {
      res.status(201).json({
        message: "Data recorded to database",
        result,
      });
    }
  });
});

module.exports = router;
