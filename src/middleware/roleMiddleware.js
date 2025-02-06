const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Access denied: No role assigned" });
        }

        // Admin has access to everything
        if (req.user.role === "Admin") {
            return next();
        }

        if (req.user.role === "Admin" || allowedRoles.includes(req.user.role)) {
            return next();
        }


        // Allow access only if the user's role is in the allowedRoles list
        if (allowedRoles.includes(req.user.role)) {
            return next();
        }

        return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    };
};

module.exports = roleMiddleware