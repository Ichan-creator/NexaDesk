const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const flash = require("../middleware/flash");

router.use(flash);

// Login
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// Register
router.get("/register", authController.showRegister);
router.post("/register", authController.register);

// Logout
router.post("/logout", authController.logout);

module.exports = router;