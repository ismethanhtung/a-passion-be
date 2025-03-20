const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /chat/start-conversation:
 *   get:
 *     summary: Start a new conversation
 *     tags: [Chat]
 */
router.get("/start-conversation", authenticate, chatController.createConversation);

/**
 * @swagger
 * /chat/conversations/{userId}:
 *   get:
 *     summary: Get all conversations for a user
 *     tags: [Chat]
 */
router.get("/conversations/:userId", authenticate, chatController.getAllConversationByUserId);

module.exports = router;
