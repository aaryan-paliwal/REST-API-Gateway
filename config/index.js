// Loads environment variables from a .env file into process.env
require('dotenv').config();

// Centralized configuration object for the application.
// This file gathers all essential environment variables and provides default values.
const config = {
    // Port for the Express server to listen on.
    // It uses the PORT environment variable if available, otherwise defaults to 3000.
    port: process.env.PORT || 3000,

    // MongoDB connection URI.
    // It uses the MONGO_URI environment variable, which should contain the connection string
    // for your MongoDB database (e.g., from MongoDB Atlas).
    mongoURI: process.env.MONGO_URI,

    // JWT (JSON Web Token) secret key.
    // This secret is used to sign and verify JWTs for authentication.
    // It should be a strong, randomly generated string and kept secure.
    jwtSecret: process.env.JWT_SECRET,
};

// Export the configuration object to make it accessible throughout the application.
module.exports = config;