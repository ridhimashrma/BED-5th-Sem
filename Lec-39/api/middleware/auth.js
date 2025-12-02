const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../controller/user");

exports.verifyToken = (req, res, next) => {

  console.log("AUTH HEADER RECEIVED:", req.headers.authorization);

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};
