const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    const lessons = await prisma.lesson.findMany();
    res.json(lessons);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(lesson);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const newLesson = await prisma.lesson.create({
            data: body,
        });
        res.status(201).json(newLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo." });
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    try {
        const updateLesson = await prisma.lesson.update({
            where: { id: parseInt(id) },
            data: { ...rest },
        });
        res.json(updateLesson);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteLesson = await prisma.lesson.delete({
            where: { id: parseInt(id) },
        });
        res.json(deleteLesson);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
