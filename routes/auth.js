const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "co-khi-nao-ta-xa-roi"; // Thay bằng một giá trị thực tế hoặc từ .env

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Mật khẩu sai",
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000, // 1 giờ
        });

        return res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (err) {
        console.error("Error during login:", err); // Ghi lại chi tiết lỗi
        return res.status(500).json({
            message: "Đã xảy ra lỗi khi đăng nhập",
            error: err.message,
        });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Đăng xuất thành công." });
});

module.exports = router;
