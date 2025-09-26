const User = require("../Model/userModel");

exports.checkAuth = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ isAuthenticated: false });
    }
    res.json({ isAuthenticated: true });
  } catch (err) {
    console.error("❌ Error checking auth:", err);
    res.status(500).json({ isAuthenticated: false });
  }
};

exports.register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ success: false });
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false });
    }

    const user = new User({ username, password, role: "user" });
    await user.save();

    res.json({ success: true, userId: user._id.toString() });
  } catch (err) {
    console.error("❌ Error registering user:", err);
    res.status(500).json({ success: false });
  }
};

exports.login = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ success: false });
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false });
    }

    res.json({ success: true, userId: user._id.toString() });
  } catch (err) {
    console.error("❌ Error logging in:", err);
    res.status(500).json({ success: false });
  }
};

exports.logout = (req, res) => {
  res.json({ success: true });
};