const express = require("express");
const router = express.Router();
const { User } = require("../models/model");

router.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next(); // Call next to proceed to the next middleware or route handler
});
// Create User
router.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    consol.log("response", res);
  } catch (err) {
    console.log("errror is ", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
