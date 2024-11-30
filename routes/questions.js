const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    const quesions = await prisma.question.findMany();
    res.json(quesions);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const question = await prisma.quesion.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(quesion);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const newQuestion = await prisma.quesion.create({
            data: body,
        });
        res.status(201).json(newQuestion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    try {
        const updateQuestion = await prisma.quesion.update({
            where: { id: parseInt(id) },
            data: { ...rest },
        });
        res.json(updateQuestion);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteQuestion = await prisma.quesion.delete({
            where: { id: parseInt(id) },
        });
        res.json(deleteQuestion);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
