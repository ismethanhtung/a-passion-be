const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).send("Access denied.");
    }

    // Giả sử đây là cách bạn kiểm tra token
    if (token !== "Bearer mysecrettoken") {
        return res.status(403).send("Invalid token");
    }

    next();
};

module.exports = authMiddleware;
