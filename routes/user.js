const express = require("express");

const router = express.Router();
const Controllers = require("../controllers/user");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

router.post("/signup", Controllers.registerUser);
router.post("/login", Controllers.loginUser);
router.post("/logout", Controllers.logoutUser);
router.get("/profile", ensureAuthenticated, Controllers.getUserProfile);
router.post("/user", ensureAdmin, Controllers.Createuser);
router.get("/Allusers", ensureAdmin, Controllers.GetallUsers);
router.get("/:id", ensureAdmin, Controllers.getUserById);
router.patch("/:id", ensureAdmin, Controllers.updateUserById);
router.delete("/:id", ensureAdmin, Controllers.deleteUserById);

module.exports = router;
