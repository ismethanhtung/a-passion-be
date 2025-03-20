const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /progress:
 *   get:
 *     summary: Get all progress data
 *     tags: [Progress]
 *     responses:
 *       200:
 *         description: A list of progress records
 */
router.get("/", progressController.getAllProgress);

/**
 * @swagger
 * /progress/limit:
 *   get:
 *     summary: Get limited progress data
 *     tags: [Progress]
 *     responses:
 *       200:
 *         description: A subset of progress records
 */
router.get("/limit", progressController.getLimitProgress);

/**
 * @swagger
 * /progress/{id}:
 *   get:
 *     summary: Get progress by ID
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Progress data
 */
router.get("/:id", progressController.getProgressById);

/**
 * @swagger
 * /progress:
 *   post:
 *     summary: Create a new progress record
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Progress record created
 */
router.post("/", authenticate, progressController.createProgress);

/**
 * @swagger
 * /progress/{id}:
 *   put:
 *     summary: Update a progress record
 *     tags: [Progress]
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
 *         description: Progress record updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    progressController.updateProgress
);

/**
 * @swagger
 * /progress/{id}:
 *   delete:
 *     summary: Delete a progress record
 *     tags: [Progress]
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
 *         description: Progress record deleted
 */
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    progressController.deleteProgress
);

module.exports = router;
