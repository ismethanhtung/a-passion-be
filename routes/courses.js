const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const courses = await prisma.course.findMany();
    res.json(courses);
});

router.post("/", async (req, res) => {
    const { title, description, tag, teacherId } = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                tag,
                teacher: { connect: { id: teacherId } },
            },
        });
        res.status(201).json(newCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, tag } = req.body;

    try {
        const updateCourse = await prisma.course.update({
            where: { id: parseInt(id) },
            data: { title, description, tag },
        });
        res.json(updateCourse);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", async (req, res) => {
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
