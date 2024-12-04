const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.get("/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const reviews = await prisma.review.findMany({
            where: { courseId: parseInt(courseId) },
            include: { user: { select: { name: true } } },
        });
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách bình luận." });
    }
});

router.post("/", async (req, res) => {
    const { userId, courseId, rating, comment } = req.body;
    try {
        const newReview = await prisma.review.create({
            data: {
                userId,
                courseId,
                rating,
                comment,
            },
        });
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi thêm bình luận." });
    }
});

module.exports = router;
