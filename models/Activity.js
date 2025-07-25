// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for the Activity model.
// This schema records user activities (actions) in the application.
const activitySchema = new mongoose.Schema({
  // userId: References the User who performed the activity.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // username: Stores the username of the user who performed the action.
  username: String,
  // action: Describes the type of activity performed (e.g., "LOGIN", "CREATE_ITEM").
  action: String,
  // itemId: Optionally references an Item related to the activity.
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Export the Activity model, or use the existing one if already compiled (for hot-reloading environments)
module.exports = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

