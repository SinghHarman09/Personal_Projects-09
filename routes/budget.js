const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/budget");

router.post("/new", Controllers.createBudget);
router.get("/allbudgets", Controllers.getBudgets);
router.get("/:id", Controllers.getBudgetById);
router.patch("/:id", Controllers.updateBudgetById);
router.delete("/:id", Controllers.deleteBudgetById);

module.exports = router;
