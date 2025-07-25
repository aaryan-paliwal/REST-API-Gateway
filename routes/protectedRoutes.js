const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware"); // Import authentication middleware

// ✅ Protected test route
// Only accessible if the user is authenticated
router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

module.exports = router;

