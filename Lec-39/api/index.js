const express = require("express");
const app = express();

app.use(express.json());
let { publisher } = require("../shared/index");

app.use("/api/v1/user", require("./routes/user"));

app.use("/api/v1/order", require("./routes/order"));

app.listen(4000, () => {
  console.log("server started on port 4000");
});

publisher.connect()
  .then(() => console.log("publisher client connected"))
  .catch((err) => console.log("publisher connection failed:", err));
