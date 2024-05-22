const express = require("express");
const cors = require("cors");
const connect = require("./database/connection.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/user.js"));
app.use("/api", require("./routes/content.js"));

app.listen(PORT, () => {
  connect();
  console.log(`http://localhost:${PORT}`);
});
