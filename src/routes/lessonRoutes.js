const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authenticate = require("../middlewares/authMiddleware");
// const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", lessonController.getLessons);
router.get("/:id", lessonController.getLessonById);
router.post("/", authenticate, lessonController.createLesson);
router.put("/:id", authenticate, lessonController.updateLesson);
router.delete("/:id", authenticate, lessonController.deleteLesson);

module.exports = router;
