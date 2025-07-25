const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/authController"); // Import authentication controllers
const authMiddleware = require("../middleware/authMiddleware"); // Import authentication middleware

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);
// Route to log in a user
router.post("/login", loginUser);
// Route to get the current user's profile (protected)
router.get("/me", authMiddleware, getMe);

module.exports = router;

