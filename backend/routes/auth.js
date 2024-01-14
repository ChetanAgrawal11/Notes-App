const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
// // const { body, validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const JWT_Secret = "Heellotheseisthecreationjwtsecret";

// Register the user
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
      // Here the jwt creates and assign jwt token it is basically used for authentication and for auhorization purpose
      const data = {
        user: {
          id: user.id,
        },
      };
      // const jwt_token = jwt.sign(user.id, JWT_Secret);
      const jwt_token = jwt.sign(data, JWT_Secret);
      res.json({ jwt_token });
      // res.send(user);
    } catch (error) {
      //  These is the just the checking of the error we can also remove the catch block no issue with it
      res.status(500).json("Some error has been occured");
      console.log(error.message);
    }

    // .then((user) => res.json(user))
    // .catch((error) => res.status(500).json({ error: error.message }));
  }
);

// Login of the user

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password must have some length").exists(),
  ],
  async (req, res) => {
    let ans = false;
    // // Validation checking upar k condition check ho rhi h
    // Checking the email already present in the array or not
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    // These is the getting of the password from the body that user will enter
    const { email, password } = req.body;

    try {
      // These is just finding if user is present or not
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Crendentail !!!" });
      }
      // brycpt compare is used to compare the user find with the password of the orignal user
      const brycrypt_com = await bcrypt.compare(password, user.password);
      if (!brycrypt_com) {
        return res.status(400).json({ error: "Invalid Crendentail !!!" });
      }

      // const jwt_token = jwt.sign(user.id, JWT_Secret);
      const data = {
        user: {
          id: user.id,
        },
      };
      ans = true;
      const jwt_token = jwt.sign(data, JWT_Secret);
      res.json({ ans, jwt_token });
    } catch (error) {
      //  These is the just the checking of the error we can also remove the catch block no issue with it
      res.status(500).json("Some error has been occured");
      console.log(error.message);
    }
  }
);

// Getting the user using their Id and using token

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id).select("-password");
    res.json(user);
  } catch (error) {
    //  These is the just the checking of the error we can also remove the catch block no issue with it
    res.status(500).json("Some error has been occured");
    console.log(error.message);
  }
});

module.exports = router;
