const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get("/", authenticate, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                role: true,
            },
        });

        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
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
