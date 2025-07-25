const User = require("../models/User"); // Import the User model for database operations
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating and verifying JWTs
const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing and comparing passwords
const logActivity = require("../utils/logActivity"); // Import utility to log user activities
const config = require("../config"); // Import configuration (for JWT secret)

// Controller to handle user registration
const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body; // Get username and password from request body

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database
    const user = await User.create({ username, password: hashedPassword });

    // Log the registration activity
    await logActivity(user._id, "REGISTER");

    // Create a JWT token for the new user so they can be auto-logged in after registration
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    // Respond with a success message and the JWT token
    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Controller to handle user login
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body; // Get username and password from request body

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Create a JWT token containing user info (userId, username, role)
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Log the login activity
    await logActivity(user._id, "LOGIN");

    res.json({ token }); // Send the token to the client
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Controller to get the current user's profile (excluding password)
const getMe = async (req, res, next) => {
  try {
    // req.user is set by the authentication middleware
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Export the controller functions for use in routes
module.exports = { registerUser, loginUser, getMe };






