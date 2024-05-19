const express = require("express");
const router = express.Router();
const { Expense } = require("../models/model");

router.post("/expenses", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    console.log("hello", expense);
    res.status(201).json(expense);
    console.log("res", res);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log("error", err);
  }
});
module.exports = router;
