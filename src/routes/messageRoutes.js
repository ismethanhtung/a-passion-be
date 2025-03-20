const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /message:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 */
router.get("/", messageController.getAllMessages);

/**
 * @swagger
 * /message/limit:
 *   get:
 *     summary: Get limited messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A subset of messages
 */
router.get("/limit", messageController.getLimitMessages);

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     summary: Get message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message data
 */
router.get("/:id", messageController.getMessageById);

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Message created
 */
router.post("/", authenticate, authorizeRoles("admin", "teacher"), messageController.createMessage);

/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: Update a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message updated
 */
router.put("/:id", authenticate, messageController.updateMessage);

/**
 * @swagger
 * /message/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), messageController.deleteMessage);

module.exports = router;
