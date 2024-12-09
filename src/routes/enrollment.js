const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middlewares/authMiddleware");

router.post("/", async (req, res) => {
    const { userId, courseId } = req.body;

    try {
        const enrollment = await prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: "Error creating enrollment." });
    }
});

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId: parseInt(userId) },
            include: { course: true, progress: true },
        });
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching enrollments." });
    }
});

module.exports = router;
