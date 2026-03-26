const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

let currentNumber = Math.floor(Math.random() * 10);

// ⏱ auto change every 20 sec
setInterval(() => {
  currentNumber = Math.floor(Math.random() * 10);
}, 20000);

// current round
router.get("/round", (req, res) => {
  res.json({ currentNumber });
});

// play game
router.post("/play", auth, async (req, res) => {
  const { number } = req.body;

  const user = await User.findById(req.user.id);

  let result = "LOSE";

  if (number == currentNumber) {
    result = "WIN";
    user.coins += 20;
  } else {
    user.coins -= 10;
  }

  await user.save();

  res.json({
    result,
    number,
    currentNumber,
    coins: user.coins
  });
});

module.exports = router;
