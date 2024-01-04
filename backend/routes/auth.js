const express = require("express");
const router = express.Router();
const user = require("../models/User");
router.post("/", (req, res) => {
  res.send("Hello these is just the checking of the auth page ");
  const User = user(req.body);
  User.save();
});
module.exports = router;
