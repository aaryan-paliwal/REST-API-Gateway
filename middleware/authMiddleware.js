const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library for handling JWTs.
const config = require("../config"); // Import the centralized configuration to access JWT_SECRET.

// This middleware function is responsible for authenticating requests.
// It checks for a valid JSON Web Token (JWT) in the request header.
const authMiddleware = (req, res, next) => {
  // Get the Authorization header from the incoming request.
  // This header typically looks like "Bearer YOUR_TOKEN_HERE".
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is missing or doesn't start with "Bearer ".
  // If it's not present or malformed, the request is unauthorized.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided or invalid format." });
  }

  // Extract the token part from the "Bearer YOUR_TOKEN_HERE" string.
  // It splits the string by space and takes the second element (the token itself).
  const token = authHeader.split(" ")[1];

  try {
    // Verify the extracted token using the JWT_SECRET from the configuration.
    // If the token is valid, `jwt.verify` returns the decoded payload (which contains userId, username, role).
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach the decoded user information to the `req.user` object.
    // This makes user data (like ID, username, role) accessible in subsequent route handlers.
    req.user = decoded;

    // Call `next()` to pass control to the next middleware function or the route handler.
    next();
  } catch (err) {
    // If `jwt.verify` throws an error (e.g., token is expired, invalid, or malformed),
    // it means the token is not valid.
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

// Export the middleware function so it can be used in routes.
module.exports = authMiddleware;




