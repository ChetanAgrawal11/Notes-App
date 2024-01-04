const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello these is just the checking of the Notes page ");
});
module.exports = router;
