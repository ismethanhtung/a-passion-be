const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", notificationController.getAllNotifications);
router.get("/limit", notificationController.getLimitNotifications);
router.get("/:id", notificationController.getNotificationById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    notificationController.createNotification
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    notificationController.updateNotification
);
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    notificationController.deleteNotification
);

module.exports = router;
