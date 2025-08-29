const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, "okk", { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login successful",
    token,
  });
};