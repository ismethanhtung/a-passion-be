const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", lessonController.getLessons);
router.get("/:id", lessonController.getLessonById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), lessonController.createLesson);
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), lessonController.updateLesson);
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    lessonController.deleteLesson
);

module.exports = router;
