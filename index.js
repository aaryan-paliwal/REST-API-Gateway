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

// Load environment variables from .env file FIRST
require("dotenv").config();

const express = require("express"); // Import the Express.js framework for building web applications.
const mongoose = require("mongoose"); // Import Mongoose for MongoDB object data modeling.
const helmet = require("helmet"); // Import Helmet for setting various HTTP headers to secure the app.
const rateLimit = require("express-rate-limit"); // Import express-rate-limit for basic rate limiting to prevent abuse.
const cors = require("cors"); // Import CORS middleware for handling cross-origin requests.

// --- Import Route Handlers ---
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const dataRoutes = require("./routes/dataRoutes");
const activityRoutes = require("./routes/activityRoutes");

// --- Import Custom Middleware ---
const errorHandler = require("./middleware/errorHandler"); // For centralized error handling.

const app = express(); // Create an Express application instance.

// --- Environment Variables Configuration ---
// Retrieve configuration from process.env (loaded by dotenv)
const PORT = process.env.PORT || 5000; // Use port from env or default to 5000.
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection string.
const FRONTEND_URL = process.env.FRONTEND_URL; // Your Vercel frontend URL from .env.

// --- Middleware Setup ---

// Determine allowed origins based on environment
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction
    ? ["https://flowops.onrender.com"]
    : ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl requests)
        // or if the origin is in our allowed list. 
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Explicitly allowed HTTP methods.
    credentials: true, // Allow cookies to be sent (if your auth later uses them).
    optionsSuccessStatus: 204 // Status for successful preflight requests.
};

app.use(cors(corsOptions)); // Apply the configured CORS middleware globally.

// 2. Body Parser Middleware: Parses incoming JSON request bodies.
app.use(express.json());

// 3. Security Headers Middleware: Sets various HTTP headers to secure the app.
app.use(helmet());

// 4. Rate Limiting Middleware: Restricts repeated requests to prevent abuse.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes: The time window.
    max: 100, // Max 100 requests per 15 minutes per IP address.
    message: "Too many requests from this IP, please try again after 15 minutes.",
    // You might want to apply this only to specific routes like /auth, not all.
    // E.g., app.use('/api/auth', limiter); if you only want to limit auth calls.
});
app.use(limiter); // Applied globally for now.

// --- Database Connection ---

// Connect to MongoDB using Mongoose.
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected"); // Log success message.
        // Start the Express server only after a successful database connection.
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`); // Log server start message.
        });
    })
    .catch(err => {
        console.error("❌ DB connection error:", err); // Log detailed error message.
        process.exit(1); // Exit the process with an error code if DB connection fails.
    });

// --- Route Definitions ---

// Mount all API route handlers.
app.use("/api/auth", authRoutes); // Auth routes (login, register)
app.use("/api/items", itemRoutes); // Item management routes
app.use("/api", protectedRoutes); // General protected routes (like /api/protected, /api/activity)
app.use("/data", dataRoutes); // Legacy or generic data routes
app.use("/api/activity", activityRoutes); // Activity logging routes

// Default route for the root URL.
// Responds with a simple message to indicate the API is working.
app.get("/", (req, res) => {
    res.send("API is working!");
});

// --- Error Handling ---

// 1. 404 Not Found Handler: Must be AFTER all valid routes but BEFORE global error handler.
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// 2. Global Error Handler: Must be the LAST middleware.
// Catches any errors passed by `next(err)` from other middleware or route handlers.
app.use(errorHandler);



