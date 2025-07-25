// ===============================
// Main Entry Point: Backend Server
// ===============================
// This file sets up and starts the Express.js backend server.
// It connects to MongoDB, applies security and rate-limiting middleware,
// mounts all API routes, and handles errors.
//
// Key Flow:
// 1. Loads configuration and middleware.
// 2. Connects to MongoDB.
// 3. Sets up all API routes (auth, items, activity, data, etc.).
// 4. Handles 404 and other errors.
// 5. Starts the server only after a successful DB connection.
//
// See Codeflow.md for a full project overview.
// ===============================
const express = require("express"); // Import the Express.js framework for building web applications.
const mongoose = require("mongoose"); // Import Mongoose for MongoDB object data modeling.
const helmet = require("helmet"); // Import Helmet for setting various HTTP headers to secure the app.
const rateLimit = require("express-rate-limit"); // Import express-rate-limit for basic rate limiting to prevent abuse.
const config = require("./config"); // Import the centralized configuration object.

// Import route handlers for different parts of the API.
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const dataRoutes = require("./routes/dataRoutes");
const activityRoutes = require("./routes/activityRoutes");

// Import custom error handling middleware.
const errorHandler = require("./middleware/errorHandler");

const app = express(); // Create an Express application instance.

// --- Middleware Setup ---

// express.json(): Built-in middleware to parse incoming JSON requests.
// It makes JSON data available on `req.body`.
app.use(express.json());

// helmet(): Applies various security HTTP headers.
// This helps protect the application from common web vulnerabilities.
app.use(helmet());

// Rate Limiter:
// Configures a rate limiting middleware to restrict repeated requests to public APIs
// and/or endpoints such as password reset.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes: The time window for which requests are counted.
  max: 100, // Max 100 requests per 15 minutes per IP address.
  message: "Too many requests from this IP, try again later.", // Message sent when limit is exceeded.
});
app.use(limiter); // Apply the rate limiting middleware to all requests.

// --- Database Connection ---

// Connect to MongoDB using Mongoose.
// The connection URI is retrieved from the centralized configuration.
mongoose.connect(config.mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected"); // Log success message if connection is established.
    // Start the Express server only after a successful database connection.
    app.listen(config.port, () => {
      console.log(`🚀 Server running at http://localhost:${config.port}`); // Log server start message.
    });
  })
  .catch(err => {
    console.log("❌ DB connection error", err); // Log error message if connection fails.
    process.exit(1); // Exit the process with an error code if DB connection fails.
  });

// --- Route Definitions ---

// Mount route handlers at specific base paths.
// Requests to /api/auth will be handled by authRoutes.
app.use("/api/auth", authRoutes);
// Requests to /api/items will be handled by itemRoutes.
app.use("/api/items", itemRoutes);
// Requests to /api (for protected routes) will be handled by protectedRoutes.
app.use("/api", protectedRoutes);
// Requests to /data will be handled by dataRoutes.
app.use("/data", dataRoutes);
// Requests to /api/activity will be handled by activityRoutes.
app.use("/api/activity", activityRoutes);

// Default route for the root URL.
// Responds with a simple message to indicate the API is working.
app.get("/", (req, res) => {
  res.send("API is working!");
});

// --- Error Handling ---

// 404 Not Found Handler:
// This middleware catches any requests that fall through all other routes.
// It responds with a 404 status and a JSON message.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler:
// This is the last middleware in the chain.
// It catches any errors passed by `next(err)` from other middleware or route handlers.
// It uses the custom `errorHandler` to send a consistent error response.
app.use(errorHandler);



