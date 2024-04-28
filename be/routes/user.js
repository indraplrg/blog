const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../database/connection.js");
const Validation = require("../middlewares/Validation.js");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or Password invalid!" });
  }

  const sql = "SELECT password FROM user WHERE username = ?";
  const values = [username];

  try {
    const result = await db.query(sql, values);
    console.log(result);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashPassword = result[0].password;
    const validation = await bcrypt.compare(password, hashPassword);

    if (!validation) {
      return res.status(401).json({ message: "Password incorrect!" });
    } else {
      return res.status(200).json({ message: "Password correct" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
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

  const hashPassword = await bcrypt.hash(password, saltRounds);
  const sql = "INSERT into user (username,password) VALUES (?,?)";
  const values = [username, hashPassword];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Failed to create an Account");
      return res.status(500).json({ error });
    } else {
      return res.status(201).json({ result });
    }
  });
});

module.exports = router;
