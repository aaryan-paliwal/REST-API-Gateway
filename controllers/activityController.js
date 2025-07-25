const ActivityLog = require("../models/ActivityLog"); // Import the ActivityLog model

// Controller to get activity logs
// Admins see all logs, regular users see only their own
exports.getActivityLogs = async (req, res, next) => {
  try {
    // If the user is an admin, fetch all logs; otherwise, fetch only logs for the current user
    const query = req.user.role === "admin"
      ? {}
      : { userId: req.user.userId };

    // Find logs, sort by most recent, and limit to the latest 50 entries
    const logs = await ActivityLog.find(query)
      .sort({ timestamp: -1 })
      .limit(50); // show latest 50

    res.json(logs); // Send logs to the client
  } catch (err) {
    next(err); // Pass error to error handler
  }
};


