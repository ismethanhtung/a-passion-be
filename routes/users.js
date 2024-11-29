const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.post("/", authenticate, async (req, res) => {
    const { password, ...rest } = req.body;

    try {
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 2);

        const newUser = await prisma.user.create({
            data: { ...rest, password: hashedPassword },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo người dùng." });
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    try {
        let updatedData = { ...rest };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 2);
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updatedData,
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Đã xảy ra lỗi khi cập nhật người dùng.",
        });
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: "User not found" });
    }
});

module.exports = router;
