const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { refresh } = require("../services/authService");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    console.log(req.cookies);
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        console.log("❤️ No Access token");
        return res.status(401).json({ message: "No Access token" });
    }

    try {
        req.user = jwt.verify(accessToken, JWT_SECRET);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                console.log("No Refresh token");

                return res.status(401).json({ message: "No Refresh token" });
            }

            try {
                const newAccessToken = await refresh(refreshToken);
                console.log("create new access token");
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 60 * 60 * 1000,
                });

                req.user = jwt.decode(newAccessToken);
                next();
            } catch (refreshError) {
                return res.status(401).json({ message: "authen Cant renew token" });
            }
        } else {
            console.log("authen Invalid Token");
            return res.status(401).json({ message: "authen Invalid Token" });
        }
    }
};

module.exports = authenticate;
