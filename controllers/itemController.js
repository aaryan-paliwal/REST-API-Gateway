const Item = require("../models/item"); // Import the Item model for database operations
const canAccessItem = require("../utils/canAccessItem"); // Utility to check if user can access an item
const logActivity = require("../utils/logActivity"); // Utility to log user activities

// Controller to get a paginated list of items
exports.getItems = async (req, res, next) => {
    try {
        const { page = 1, limit = 5 } = req.query; // Pagination parameters

        // Query to filter items: admin sees all, regular user sees only their own
        const query = req.user.role === "admin"
            ? {}
            : { userId: req.user.userId };

        const items = await Item.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        // Map items to add 'isOwner' flag only if the requester is an admin
        const results = items.map(item => {
            const obj = item.toObject(); // Convert Mongoose document to plain JavaScript object
            if (req.user.role === "admin") {
                obj.isOwner = item.userId.toString() === req.user.userId;
            }
            return obj;
        });

        res.json(results);
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};

// Controller to get a single item by ID
exports.getItemById = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if the user has access based on role or ownership
        const canAccess = canAccessItem(req.user, item);
        if (!canAccess) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this item." });
        }

        const itemData = item.toObject(); // Convert Mongoose document to plain JavaScript object
        // Add 'isOwner' flag only if the requester is an admin
        if (req.user.role === "admin") {
            itemData.isOwner = item.userId.toString() === req.user.userId;
        }

        res.json(itemData);
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};

// Controller to create a new item
exports.createItem = async (req, res, next) => {
    try {
        const { name, quantity } = req.body;

        const item = new Item({
            name,
            quantity,
            userId: req.user.userId,       // Assign item to the logged-in user
            createdByRole: req.user.role   // Record the role of the user who created it
        });

        await item.save(); // Save the new item to the database

        // Log the activity: who created which item
        await logActivity(req.user.userId, "CREATE_ITEM", { itemId: item._id, itemName: item.name });

        res.status(201).json(item); // Respond with the newly created item
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};

// Controller to update an existing item by ID
exports.updateItem = async (req, res, next) => {
    const { id } = req.params; // Get item ID from URL parameters

    try {
        const item = await Item.findById(id); // Find the item by ID

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if the user has permission to update the item
        if (!canAccessItem(req.user, item)) {
            return res.status(403).json({ message: "Access denied. You can only update your own items." });
        }

        // Find and update the item, return the updated document
        const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });

        // Log the activity: who updated which item
        await logActivity(req.user.userId, "UPDATE_ITEM", { itemId: updated._id, itemName: updated.name });

        res.json(updated); // Respond with the updated item
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};

// Controller to delete an item by ID
exports.deleteItem = async (req, res, next) => {
    const { id } = req.params; // Get item ID from URL parameters

    try {
        const item = await Item.findById(id); // Find the item by ID

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if the user has permission to delete the item
        if (!canAccessItem(req.user, item)) {
            return res.status(403).json({ message: "Access denied. Admins or owners only." });
        }

        // Delete the item from the database
        await item.deleteOne();

        // Log the activity: who deleted which item
        await logActivity(req.user.userId, "DELETE_ITEM", { itemId: item._id, itemName: item.name });

        res.json({ message: "Item deleted" }); // Respond with a success message
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};


