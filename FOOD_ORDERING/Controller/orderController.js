const Order = require("../Model/orderModel");

const menu = [
  { id: 1, name: "Pizza", price: 8 },
  { id: 2, name: "Burger", price: 5 },
  { id: 3, name: "Pasta", price: 7 },
  { id: 4, name: "Salad", price: 6 },
  { id: 5, name: "Sushi", price: 12 },
  { id: 6, name: "Tacos", price: 9 },
  { id: 7, name: "Fried Rice", price: 7 },
  { id: 8, name: "Biryani", price: 10 },
  { id: 9, name: "Noodles", price: 6 },
  { id: 10, name: "Sandwich", price: 5 },
  { id: 11, name: "Wraps", price: 7 },
  { id: 12, name: "Desserts", price: 15 }
];

// In-memory cart storage (userId -> cart)
const userCarts = {};

exports.getHome = (req, res) => {
  res.sendFile("home.html", { root: "./Public" });
};

exports.getMenu = (req, res) => {
  res.json({ menu });
};

exports.addToCart = (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to add items to cart", redirect: "/login.html" });
  }

  const { itemId } = req.body;
  const item = menu.find((m) => m.id == itemId);
  if (!item) return res.status(404).json({ error: "Item not found" });

  if (!userCarts[userId]) userCarts[userId] = [];
  const cart = userCarts[userId];

  const existing = cart.find((c) => c.id == item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  res.json({ cart });
};

exports.getCart = (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to view cart", redirect: "/login.html" });
  }

  const cart = userCarts[userId] || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ cart, total });
};

exports.removeFromCart = (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to modify cart", redirect: "/login.html" });
  }

  const { itemId } = req.body;
  if (!userCarts[userId]) userCarts[userId] = [];
  userCarts[userId] = userCarts[userId].filter((item) => item.id != itemId);
  res.json({ cart: userCarts[userId] });
};

exports.getOrderForm = (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.redirect("/login.html");
  }

  const cart = userCarts[userId] || [];
  if (cart.length === 0) {
    return res.status(400).json({ error: "Your cart is empty", redirect: "/menu.html" });
  }
  res.sendFile("order-form.html", { root: "./Public" });
};

exports.placeOrder = async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to place an order", redirect: "/login.html" });
  }

  const { name, phone, address } = req.body;
  const cart = userCarts[userId] || [];

  if (!name || !phone || !address || cart.length === 0) {
    return res.status(400).json({ error: "All fields are required and cart should not be empty", redirect: "/order-form.html" });
  }

  const newOrder = new Order({
    userId,
    customer: { name, phone, address },
    items: [...cart],
  });

  try {
    await newOrder.save();
    userCarts[userId] = []; // Clear cart
    res.json({ success: true, redirect: "/view-orders" });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

exports.viewOrders = async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to view orders", redirect: "/login.html" });
  }

  try {
    const orders = await Order.find({ userId }).lean();
    const ordersForTemplate = orders.map((order) => ({
      orderId: order._id.toString(),
      name: order.customer.name,
      phone: order.customer.phone,
      address: order.customer.address,
      quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
      item: order.items.map((i) => `${i.name} (x${i.quantity})`).join(", "),
    }));

    res.json({ orders: ordersForTemplate });
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Could not fetch orders." });
  }
};

exports.deleteOrder = async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to delete orders", redirect: "/login.html" });
  }

  const orderId = req.body.orderId;
  try {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ error: "Order not found or not authorized" });
    await Order.deleteOne({ _id: orderId, userId });
    res.json({ success: true, redirect: "/view-orders" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ error: "Failed to delete order." });
  }
};

exports.getUpdateOrder = async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to update orders", redirect: "/login.html" });
  }

  const orderId = req.params.orderId;
  try {
    const order = await Order.findOne({ _id: orderId, userId }).lean();
    if (!order) return res.status(404).json({ error: "Order not found or not authorized" });
    res.json({
      order: {
        orderId: order._id.toString(),
        itemName: order.items[0].name,
        quantity: order.items[0].quantity,
      }
    });
  } catch (err) {
    console.error("❌ Error loading update form:", err);
    res.status(500).json({ error: "Error loading order." });
  }
};

exports.updateOrder = async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: "Please log in to update orders", redirect: "/login.html" });
  }

  const orderId = req.params.orderId;
  const { item, quantity } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ error: "Order not found or not authorized" });
    await Order.updateOne(
      { _id: orderId, userId },
      {
        $set: {
          "items.0.name": item,
          "items.0.quantity": quantity,
        },
      }
    );
    res.json({ success: true, redirect: "/view-orders" });
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(500).json({ error: "Failed to update order." });
  }
};