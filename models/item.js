// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for the Item model.
// This schema describes the structure and validation rules for item documents.
const itemSchema = new mongoose.Schema({
  // Name of the item:
  // - type: String for text value.
  // - required: true means every item must have a name.
  name: { type: String, required: true },

  // Quantity of the item:
  // - type: Number for numerical value.
  // - required: true means every item must have a quantity.
  // - default: 0 sets the initial quantity to 0 if not provided.
  quantity: { type: Number, required: true, default: 0 },

  // userId: References the User who created this item.
  // - type: mongoose.Schema.Types.ObjectId indicates it's a MongoDB ObjectId.
  // - ref: "User" tells Mongoose that this ObjectId refers to a document in the "User" collection.
  // - required: true means every item must be associated with a user.
  // - index: true creates a database index on this field, which significantly speeds up
  //   queries that filter or sort by userId (e.g., finding all items by a specific user).
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

  // createdByRole: Records the role of the user who created the item.
  // - type: String.
  // - enum: ["user", "admin"] restricts the values to either "user" or "admin".
  // - required: true means this field must always be present.
  createdByRole: { type: String, enum: ["user", "admin"], required: true },
}, {
  // timestamps: true automatically adds `createdAt` and `updatedAt` fields.
  // `createdAt`: records when the item was first created.
  // `updatedAt`: records when the item was last modified.
  timestamps: true
});

// Export the Item model.
// This makes the Item model available for use in other parts of the application,
// allowing interaction with the 'items' collection in MongoDB.
module.exports = mongoose.models.Item || mongoose.model("Item", itemSchema);


