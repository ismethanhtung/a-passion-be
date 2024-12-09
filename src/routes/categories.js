const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: body,
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo." });
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCategory = await prisma.category.delete({
            where: { id: parseInt(id) },
        });
        res.json(deleteCategory);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
