const express = require("express");
const router = express.Router();
const {
  getAllData,
  getOneData,
  addData,
  updateData,
  deleteData,
} = require("../controllers/dataController"); // Import data controllers

// CRUD Routes for the 'demo' collection
// Get all data
router.get("/", getAllData);
// Get a single data document by ID
router.get("/:id", getOneData);
// Add a new data document
router.post("/", addData);
// Update a data document by ID
router.put("/:id", updateData);
// Delete a data document by ID
router.delete("/:id", deleteData);

module.exports = router;

