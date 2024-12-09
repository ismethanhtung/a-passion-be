const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Đăng xuất thành công." });
});

module.exports = router;
