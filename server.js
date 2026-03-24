const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 MongoDB Connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 👤 User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  balance: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

// 🟢 Home Route
app.get("/", (req, res) => {
  res.send("M55club Backend Running 🚀");
});

// 🔐 Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ msg: "User already exists" });

  const user = new User({ username, password });
  await user.save();

  res.json({ msg: "Registered successfully" });
});

// 🔓 Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.json({ msg: "Invalid credentials" });

  res.json({ msg: "Login success", balance: user.balance });
});

// 💰 Deposit
app.post("/deposit", async (req, res) => {
  const { username, amount } = req.body;

  const user = await User.findOne({ username });
  user.balance += amount;
  await user.save();

  res.json({ balance: user.balance });
});

// 💸 Withdraw
app.post("/withdraw", async (req, res) => {
  const { username, amount } = req.body;

  const user = await User.findOne({ username });

  if (user.balance < amount) {
    return res.json({ msg: "Insufficient balance" });
  }

  user.balance -= amount;
  await user.save();

  res.json({ balance: user.balance });
});

// 🎮 Game (random color result)
app.get("/game", (req, res) => {
  const colors = ["GREEN", "RED", "VIOLET"];
  const result = colors[Math.floor(Math.random() * colors.length)];
  res.json({ result });
});

// 🚀 Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
