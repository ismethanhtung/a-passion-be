const jwt = require("jsonwebtoken");
const { refresh } = require("../services/authService");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    if (!req.cookies) {
        console.log("Cookies not found");
        return res.status(401).json({ message: "Cookies not found" });
    }

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
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                });

                req.user = jwt.verify(newAccessToken, JWT_SECRET);
                next();
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                return res.status(401).json({ message: "Cannot renew token" });
            }
        } else {
            console.log("Invalid Token:", error.message);
            return res.status(401).json({ message: "Invalid Token" });
        }
    }
};

module.exports = authenticate;
