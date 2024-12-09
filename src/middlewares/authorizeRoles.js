const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Không có quyền truy cập" });
        }
        next();
    };
};

module.exports = authorizeRoles;
