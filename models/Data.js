// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Define a generic schema for the 'Data' model.
// This schema is designed to be flexible and store arbitrary data
// for the 'demo' collection, which might not have a fixed structure.
const dataSchema = new mongoose.Schema({
  // An empty schema {} means that Mongoose will not enforce any specific fields
  // or types by default. It allows for a flexible document structure.
}, {
  // strict: false allows Mongoose to save any fields to the database
  // that are not explicitly defined in the schema. This is useful for
  // collections where the document structure can vary.
  strict: false,

  // timestamps: true automatically adds `createdAt` and `updatedAt` fields
  // to each document, recording creation and last update times.
  timestamps: true
});

// Export the Data model.
// mongoose.model("Data", dataSchema, "demo"):
// - "Data": The name of the model.
// - dataSchema: The schema definition for this model.
// - "demo": The third argument explicitly specifies the MongoDB collection name.
//   This is crucial here because the model name "Data" would typically map to
//   a "datas" collection, but we want it to interact with the "demo" collection.
module.exports = mongoose.model("Data", dataSchema, "demo");
