// register form to add user by clicking sign up  and login page to get users

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3987;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const usersPath = path.join(__dirname, "users.json");

function loadUsers() {
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).send("User already exists");
  }
  users.push({ username, password, todos: [] });
  saveUsers(users);
  res.send("Signup successful!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send("Invalid credentials");
  res.send("Login successful");
});

app.get("/todos", (req, res) => {
  const { user } = req.query;
  const users = loadUsers();
  const found = users.find(u => u.username === user);
  if (!found) return res.status(404).send("User not found");
  res.json(found.todos);
});

app.post("/todos", (req, res) => {
  const { username, title, description } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).send("User not found");

  const newTodo = { title, description };
  user.todos.push(newTodo);
  saveUsers(users);
  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


