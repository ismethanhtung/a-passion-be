const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { refresh } = require("../services/authService");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.auth_token;
    console.log(req.cookies.auth_token);
    if (!accessToken) {
        return res.status(401).json({ message: "No Access token" });
    }

    try {
        req.user = jwt.verify(accessToken, JWT_SECRET); // Xác thực access token
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // access token hết hạn
            const refreshToken = req.cookies.refresh_token; // Lấy refresh token từ cookies
            if (!refreshToken) {
                return res.status(401).json({ message: "No Refresh token" });
            }

            try {
                const { accessToken: newAccessToken } = await refresh(refreshToken); // Làm mới access token bằng refresh token

                res.cookie("auth_token", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 1000,
                });

                req.user = jwt.decode(newAccessToken); // Giải mã access token mới để lấy thông tin người dùng
                next();
            } catch (refreshError) {
                return res.status(401).json({ message: "Cant renew token" });
            }
        } else {
            return res.status(401).json({ message: "Invalid Token" });
        }
    }
};

module.exports = authenticate;
