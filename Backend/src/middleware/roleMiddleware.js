// Usage: authorizeRoles("admin") or authorizeRoles("admin", "student")
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `Role '${req.user?.role || "unknown"}' is not allowed to access this resource`
      );
    }
    next();
  };
};

export default authorizeRoles;