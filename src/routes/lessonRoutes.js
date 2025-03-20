const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /lesson:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of lessons
 */
router.get("/", authenticate, authorizeRoles("admin", "teacher"), lessonController.getLessons);

/**
 * @swagger
 * /lesson/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson data
 */
router.get("/:id", lessonController.getLessonById);

/**
 * @swagger
 * /lesson:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lesson created
 */
router.post("/", authenticate, authorizeRoles("admin", "teacher"), lessonController.createLesson);

/**
 * @swagger
 * /lesson/{id}:
 *   put:
 *     summary: Update a lesson
 *     tags: [Lessons]
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
 *         description: Lesson updated
 */
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), lessonController.updateLesson);

/**
 * @swagger
 * /lesson/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lessons]
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
 *         description: Lesson deleted
 */
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    lessonController.deleteLesson
);

module.exports = router;
