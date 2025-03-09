const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", authenticate, conversationController.getAllConversations);
// router.get("/:id", conversationController.getConversationByCourseId);
router.post("/", authenticate, conversationController.createConversation);
router.put("/:id", authenticate, conversationController.updateConversation);
router.delete("/:id", authenticate, conversationController.deleteConversation);

// Lưu tin nhắn vào cuộc trò chuyện
router.post("/:conversationId/message", async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { senderId, content } = req.body;

        const message = await prisma.message.create({
            data: { conversationId: parseInt(conversationId), senderId, content },
        });

        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lấy lịch sử trò chuyện
router.get("/:conversationId", async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await prisma.message.findMany({
            where: { conversationId: parseInt(conversationId) },
            orderBy: { createdAt: "asc" },
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Bắt đầu hoặc lấy cuộc trò chuyện của người dùng
router.post("/start", async (req, res) => {
    try {
        const { userId, title } = req.body;

        let conversation = await prisma.conversation.findFirst({
            where: { userId },
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: { userId, title },
            });
        }

        res.json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Lấy lịch sử tin nhắn theo userId
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const conversation = await prisma.conversation.findFirst({
            where: { userId: parseInt(userId) },
            include: { messages: { orderBy: { createdAt: "asc" } } },
        });

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found" });
        }

        res.json(conversation.messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
