const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  customer: {
    name: String,
    phone: String,
    address: String,
  },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  placedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;