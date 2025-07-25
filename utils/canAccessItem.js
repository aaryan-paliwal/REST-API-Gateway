// Utility function to check if a user can access a specific item
// Admins can access all items; regular users can only access their own items
module.exports = function canAccessItem(reqUser, item) {
  if (reqUser.role === "admin") return true; // Admins have access to all items
  return item.userId.toString() === reqUser.userId; // Users can access only their own items
};

