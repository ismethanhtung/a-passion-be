const jwt = require("jsonwebtoken");
const { get } = require("../routes");
const JWT_SECRET = "co-khi-nao-ta-xa-roi";

function authenticate(req, res, next) {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: "Không có token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token không hợp lệ", token });
    }
}

module.exports = authenticate;
