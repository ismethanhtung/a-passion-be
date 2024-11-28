const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    const courses = await prisma.course.findMany();
    res.json(courses);
});

router.post("/", authenticate, async (req, res) => {
    const body = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: body,
        });
        res.status(201).json(newCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo." });
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    try {
        const updateCourse = await prisma.course.update({
            where: { id: parseInt(id) },
            data: { ...rest },
        });
        res.json(updateCourse);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCourse = await prisma.course.delete({
            where: { id: parseInt(id) },
        });
        res.json(deleteCourse);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
