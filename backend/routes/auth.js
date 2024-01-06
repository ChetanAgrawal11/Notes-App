const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const User = require("../models/User");
// // const { body, validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name", "Wrong name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password", "Password must be of length 5 ").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      // Checking the email already present in the array or not

      // Just Adding the salt to hash password more securly -- npm i bcrypt and web--bcrypt
      const salt = bcrypt.genSaltSync(10);
      const saltPass = bcrypt.hashSync(req.body.password, salt);

      // Checking if any user with the same email already exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already present " });
      }

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: saltPass,
      });
      res.send(user);
    } catch (error) {
      res.status(500).json("Some error has been occured");
      console.log(error.message);
    }

    // .then((user) => res.json(user))
    // .catch((error) => res.status(500).json({ error: error.message }));
  }
);
module.exports = router;
