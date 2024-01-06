var jwt = require("jsonwebtoken");

const JWT_Secret = "Heellotheseisthecreationjwtsecret";

// These is used for getting the user Id that is actually in the form of jwt token here basically by taking jwt token user id is saved in req.user
const fetchUser = (req, res, next) => {
  // These is the reading of the header ie the jwt token that we will give as input
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ message: "Unauthorized - Missing token" });
  }
  try {
    const data = jwt.verify(token, JWT_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Missing token" });
  }
};
module.exports = fetchUser;
