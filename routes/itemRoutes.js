const express = require("express");
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController"); // Import item controllers
const authMiddleware = require("../middleware/authMiddleware"); // Import authentication middleware
const { body, validationResult } = require("express-validator"); // Import validators

const router = express.Router();

// Apply authentication middleware to all item routes
router.use(authMiddleware);

// Validation rules for item creation and update
const validateItem = [
    body('name', 'Name is required').not().isEmpty(),
    body('quantity', 'Quantity must be a number').isNumeric(),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Route to get all items (paginated)
router.get("/", getItems);
// Route to get a single item by ID
router.get("/:id", getItemById);
// Route to create a new item (with validation)
router.post("/", validateItem, handleValidationErrors, createItem);
// Route to update an item by ID (with validation)
router.put("/:id", validateItem, handleValidationErrors, updateItem);
// Route to delete an item by ID
router.delete("/:id", deleteItem);

module.exports = router;
