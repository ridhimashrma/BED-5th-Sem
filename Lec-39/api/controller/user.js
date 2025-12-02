const jwt = require("jsonwebtoken");

const JWT_SECRET = "MY_SUPER_SECRET_KEY"; 

let users = []; 

exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username & password required" });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  users.push({ username, password });
  return res.json({ message: "User registered successfully" });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid username or password" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({ message: "Login successful", token });
};

exports.JWT_SECRET = JWT_SECRET;
