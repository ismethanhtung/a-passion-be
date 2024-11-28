const jwt = require("jsonwebtoken");
const JWT_SECRET = "co-khi-nao-ta-xa-roi"; // Đổi thành secret thực tế, nên lưu trong .env

const authenticate = (req, res, next) => {
    const token =
        req.cookies?.auth_token || req.headers.authorization?.split(" ")[1]; // Lấy token từ cookie hoặc header

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Giải mã token
        req.user = decoded; // Thêm thông tin user vào req để các API khác dùng
        next(); // Cho phép tiếp tục
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authenticate;
