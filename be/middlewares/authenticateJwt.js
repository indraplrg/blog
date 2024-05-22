const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJwt = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: no token provided!" });
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status().json({ message: "Unauthorized: invalid token!" });
    }

    res.status(200).json({ message: "Protected Data", user: decoded });
  });
};

module.exports = authenticateJwt;
