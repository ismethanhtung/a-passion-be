const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.body);
        console.log(10000);

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Không có quyền truy cập" });
        }
        next();
    };
};

module.exports = authorizeRoles;
