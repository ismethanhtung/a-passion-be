const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 */
router.get("/", notificationController.getAllNotifications);

/**
 * @swagger
 * /notification/limit:
 *   get:
 *     summary: Get limited notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A subset of notifications
 */
router.get("/limit", notificationController.getLimitNotifications);

/**
 * @swagger
 * /notification/{id}:
 *   get:
 *     summary: Get notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification data
 */
router.get("/:id", notificationController.getNotificationById);

/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Notification created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    notificationController.createNotification
);

/**
 * @swagger
 * /notification/{id}:
 *   put:
 *     summary: Update a notification
 *     tags: [Notifications]
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
 *         description: Notification updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    notificationController.updateNotification
);

/**
 * @swagger
 * /notification/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
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
 *         description: Notification deleted
 */
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    notificationController.deleteNotification
);

module.exports = router;
