// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for the User model.
// A schema defines the structure of the documents within a collection,
// enforcing data types and validation rules.
const userSchema = new mongoose.Schema({
  // Username field:
  // - type: String ensures it's a text value.
  // - required: true means a username must always be provided.
  // - unique: true ensures no two users can have the same username.
  username: { type: String, required: true, unique: true },

  // Password field:
  // - type: String for storing the hashed password.
  // - required: true means a password must always be provided.
  password: { type: String, required: true },

  // Role field:
  // - type: String for storing the user's role (e.g., 'user' or 'admin').
  // - enum: ["user", "admin"] restricts the values to only these two.
  // - default: "user" sets 'user' as the default role if not specified.
  role: { type: String, enum: ["user", "admin"], default: "user" },

  // Timezone field:
  // - type: String for storing the user's preferred timezone.
  // - default: "UTC" sets Coordinated Universal Time as the default.
  timezone: { type: String, default: "UTC" },
}, {
  // timestamps: true is a Mongoose option that automatically adds
  // `createdAt` and `updatedAt` fields to your schema.
  // `createdAt`: records the time of document creation.
  // `updatedAt`: records the time of the last document update.
  timestamps: true
});

// Export the User model.
// mongoose.models.User checks if the model has already been compiled to prevent recompilation issues
// in environments like hot-reloading (e.g., during development).
// If it exists, use the existing model; otherwise, compile and use the new model.
module.exports = mongoose.models.User || mongoose.model("User", userSchema);


