const Data = require("../models/Data"); // Import the Data model

// Controller to get all data documents
exports.getAllData = async (req, res, next) => {
  try {
    const data = await Data.find(); // Retrieve all documents from the 'demo' collection
    res.json(data);
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Controller to get a single data document by ID
exports.getOneData = async (req, res, next) => {
  try {
    const doc = await Data.findById(req.params.id); // Find document by ID
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Controller to add a new data document
exports.addData = async (req, res, next) => {
  try {
    const newData = new Data(req.body); // Create a new Data document from request body
    const result = await newData.save(); // Save to database
    res.status(201).json({ message: "Added", id: result._id });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Controller to update an existing data document by ID
exports.updateData = async (req, res, next) => {
  try {
    const result = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update document
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated" });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Controller to delete a data document by ID
exports.deleteData = async (req, res, next) => {
  try {
    const result = await Data.findByIdAndDelete(req.params.id); // Delete document
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};



