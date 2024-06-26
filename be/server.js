const express = require("express");
const cors = require("cors");
const db = require("./database/connection.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/user.js");
app.use("/", router);

app.listen(PORT, () => {
  db.connect((error) => {
    if (error) {
      console.log("failed connect to database");
    } else {
      console.log("connection success");
    }
  });
  console.log(`http://localhost:${PORT}`);
});
