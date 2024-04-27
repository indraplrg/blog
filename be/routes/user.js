const express = require("express");
const db = require("../database/connection.js");
const router = express.Router();

router.get("/user", (req, res) => {
  const sql = "SELECT * from user";
  db.query(sql, (error, result) => {
    if (error) {
      console.error("Error to get data", error);
      return res.status(500).json({ message: "Failed to get data" });
    } else {
      res.status(201).json({ result });
    }
  });
});

router.post("/user", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Username is required!" });
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

router.get("/content", (req, res) => {
  const sql = "SELECT * from content";
  db.query(sql, (error, result) => {
    if (error) {
      console.error("Error to get data", error);
      return res.status(500).json({ message: "Failed to get data" });
    } else {
      res.status(201).json({ result });
    }
  });
});

router.post("/content", (req, res) => {
  const { userid, text } = req.body;

  if (!text || !userid) {
    return res.status(400).json({ message: "Text and User is required!" });
  }

  const sql = "INSERT INTO content (user_id,text) VALUES (?,?)";
  const values = [userid, text];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error recording data:", error);
      return res.status(500).json({ message: "Failed to record data" });
    } else {
      res.status(201).json({ message: "Data recorded to database", result });
    }
  });
});

module.exports = router;
