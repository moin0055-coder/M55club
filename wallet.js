const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/balance", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ coins: user.coins });
});

module.exports = router;
