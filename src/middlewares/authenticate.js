const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { refresh } = require("../services/authService");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "No Access token" });
    }

    try {
        req.user = jwt.verify(accessToken, JWT_SECRET);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: "No Refresh token" });
            }

            try {
                const newAccessToken = await refresh(refreshToken);
                console.log("create new access token");
                res.cookie("auth_token", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 1000,
                });

                req.user = jwt.decode(newAccessToken);
                next();
            } catch (refreshError) {
                return res.status(401).json({ message: "authen Cant renew token" });
            }
        } else {
            return res.status(401).json({ message: "authen Invalid Token" });
        }
    }
};

module.exports = authenticate;
