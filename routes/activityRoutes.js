const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController"); // Import activity log controller
const authenticate = require("../middleware/authMiddleware"); // Import authentication middleware

// Route to get activity logs (protected)
router.get("/", authenticate, activityController.getActivityLogs);

module.exports = router;

