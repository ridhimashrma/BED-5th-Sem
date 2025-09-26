const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const orderRoutes = require("./Routes/orderRoutes");
const authRoutes = require("./Routes/authRoutes");

const app = express();
const port = 5678;

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/foodOrdersDB")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));
app.use(orderRoutes);
app.use(authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
