const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middleware/authMiddleware");

router.post("/purchase", async (req, res) => {
    const { userId, courseId, amount } = req.body;

    try {
        const purchase = await prisma.purchase.create({
            data: {
                userId,
                courseId,
                amount,
            },
        });
        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ error: "Error creating purchase." });
    }
});

// Lấy danh sách các khóa học đã mua
router.get("/purchases/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const purchases = await prisma.purchase.findMany({
            where: { userId: parseInt(userId) },
            include: { course: true },
        });
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: "Error fetching purchases." });
    }
});

module.exports = router;
