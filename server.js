const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connect
mongoose.connect("mongodb+srv://Moin0055:moin123@cluster0.alkonfr.mongodb.net/m55club")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  balance: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

// ✅ Register API
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exist = await User.findOne({ username });
  if (exist) return res.send("User already exists");

  const user = new User({ username, password });
  await user.save();

  res.send("Registered ✅");
});

// ✅ Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.send("Invalid login ❌");

  res.json(user);
});

// ✅ Deposit
app.post("/deposit", async (req, res) => {
  const { username, amount } = req.body;

  const user = await User.findOne({ username });
  user.balance += amount;
  await user.save();

  res.send("Deposit Success 💰");
});

// ✅ Withdraw
app.post("/withdraw", async (req, res) => {
  const { username, amount } = req.body;

  const user = await User.findOne({ username });

  if (user.balance < amount) return res.send("Low balance ❌");

  user.balance -= amount;
  await user.save();

  res.send("Withdraw Success 💸");
});

// ✅ Check Balance
app.get("/balance/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json({ balance: user.balance });
});

// ✅ Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
