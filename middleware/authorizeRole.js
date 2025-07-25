// Middleware factory to authorize users based on their role.
// This function returns a middleware that can be used in Express routes.
//
// Usage:
// To protect a route so only 'admin' users can access it:
// router.get("/admin-only-data", authMiddleware, authorizeRole('admin'), adminController.getAdminData);
module.exports = function authorizeRole(role) {
  // The returned function is the actual Express middleware.
  // It takes (req, res, next) as arguments.
  return (req, res, next) => {
    // Check if the authenticated user's role (from req.user, set by authMiddleware)
    // matches the `role` required by this middleware.
    // If the roles do not match, the user is forbidden from accessing the resource.
    if (req.user.role !== role) {
      // Send a 403 Forbidden status with an access denied message.
      return res.status(403).json({ message: "Access denied. You do not have the required role." });
    }
    // If the user has the required role, call `next()` to pass control
    // to the next middleware in the chain or the final route handler.
    next();
  };
};

