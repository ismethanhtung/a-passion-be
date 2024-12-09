const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { password, ...rest } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 2);

        const defaultRole = await prisma.role.findUnique({
            where: { name: "student" },
        });

        const newUser = await prisma.user.create({
            data: { ...rest, password: hashedPassword, roleId: defaultRole.id },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo account." });
    }
});

module.exports = router;
