const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
    const courses = await prisma.course.findMany();
    res.json(courses);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { limit } = req.query;

    try {
        const lessonsLimit = limit ? parseInt(limit) : undefined;

        const course = await prisma.course.findUnique({
            take: lessonsLimit,
            where: { id: parseInt(id) },
            include: {
                lessons: true,
            },
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy khóa học." });
    }
});

router.post("/", async (req, res) => {
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

router.post("/:id/purchase", async (req, res) => {
    const { id } = req.params;
    try {
        //
        //
        //
        //

        res.json({ message: "Khóa học đã được mua thành công!" });
    } catch (error) {
        res.status(500).json({ error: "Không thể mua khóa học." });
    }
});

module.exports = router;
