const ActivityLog = require("../models/ActivityLog"); // Import the ActivityLog model

// Utility function to log user activities
// userId: ID of the user performing the action
// action: String describing the action (e.g., 'LOGIN', 'CREATE_ITEM')
// metadata: Optional object with extra details (e.g., itemId, itemName)
const logActivity = async (userId, action, metadata = {}) => {
  try {
    await ActivityLog.create({
      userId,
      action,
      metadata,
    }); // Save the activity log to the database
  } catch (error) {
    console.error("Failed to log activity:", error); // Log error if logging fails
  }
};

module.exports = logActivity;



