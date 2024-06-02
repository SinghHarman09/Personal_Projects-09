const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/expenses");

router.post("/expenses", Controllers.createExpense);
router.get("/allExpenses", Controllers.getExpenses);
router.get("/:id", Controllers.getExpenseById);
router.patch("/:id", Controllers.updateExpenseById);
router.delete("/:id", Controllers.deleteExpenseById);
module.exports = router;
