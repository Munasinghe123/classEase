

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Allow if the user is an admin or is requesting their own details
        if (roles.includes(req.user.role) || req.user.id === req.params.id) {
            return next();
        }
        return res.status(403).json({ message: "Access denied" });
    };
};


module.exports = authorizeRoles;