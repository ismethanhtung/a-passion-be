const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", messageController.getAllMessages);
router.get("/limit", messageController.getLimitMessages);
router.get("/:id", messageController.getMessageById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), messageController.createMessage);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    messageController.updateMessage
);
router.delete("/:id", authenticate, authorizeRoles("admin"), messageController.deleteMessage);

module.exports = router;
