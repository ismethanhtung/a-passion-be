const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: A list of questions
 */
router.get("/", questionController.getAllQuestions);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A question object
 */
router.get("/:id", questionController.getQuestionById);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Question created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    questionController.createQuestion
);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
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
 *         description: Question updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    questionController.updateQuestion
);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
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
 *         description: Question deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), questionController.deleteQuestion);

module.exports = router;
