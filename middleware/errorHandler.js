// Global error handling middleware for Express applications.
// This middleware is designed to catch any errors that occur during request processing
// and send a consistent, user-friendly error response.
// It should be placed as the last `app.use()` call in your Express application.
//
// Parameters:
// - `err`: The error object passed by `next(err)` from a previous middleware or route handler.
// - `req`: The Express request object.
// - `res`: The Express response object.
// - `next`: The next middleware function in the stack (though typically not called here).
module.exports = (err, req, res, next) => {
  // Log the error to the console for debugging purposes.
  // `err.stack` provides a detailed stack trace, which is very useful for pinpointing where the error occurred.
  // If `err.stack` is not available, `err.message` provides a simpler description.
  console.error("Error:", err.stack || err.message);

  // Set the HTTP status code for the response.
  // If the error object has a `status` property (e.g., for custom errors like 404, 400),
  // use that status. Otherwise, default to 500 (Internal Server Error) for unexpected errors.
  const statusCode = err.status || 500;

  // Send a JSON response to the client.
  // The `error` property in the JSON object will contain the error message.
  // If `err.message` is available, use it; otherwise, provide a generic "Server Error" message.
  res.status(statusCode).json({ error: err.message || "Server Error" });

  // Note: `next(err)` is typically not called in a global error handler
  // because this is usually the last error-handling middleware.
};
