// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for the ActivityLog model.
// This schema is used to record various user actions within the application.
const activityLogSchema = new mongoose.Schema({
  // userId: References the User who performed the activity.
  // - type: mongoose.Schema.Types.ObjectId indicates it's a MongoDB ObjectId.
  // - ref: "User" tells Mongoose this ObjectId refers to a document in the "User" collection.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // action: Describes the type of activity performed (e.g., "LOGIN", "CREATE_ITEM").
  // - type: String for a descriptive text.
  action: String,

  // metadata: Stores additional details about the activity.
  // - type: Object allows for flexible storage of various key-value pairs
  //   related to the specific action (e.g., { itemId: "...", itemName: "..." }).
  metadata: Object,
}, {
  // timestamps: true automatically adds `createdAt` and `updatedAt` fields.
  // For activity logs, `createdAt` is particularly useful as it records when the activity occurred.
  timestamps: true
});

// Export the ActivityLog model.
// This allows other parts of the application (like controllers or utilities)
// to interact with the 'activitylogs' collection in MongoDB.
module.exports = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);


