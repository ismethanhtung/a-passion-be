const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/start-conversation", authenticate, chatController.createConversation);
router.get("/conversations/:userId", authenticate, chatController.getAllConversationByUserId);

module.exports = router;
