const express = require("express");
const router = express.Router();
const liveCourseController = require("../controllers/liveCourseController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /live-course:
 *   get:
 *     summary: Get all live courses
 *     tags: [Live Courses]
 *     responses:
 *       200:
 *         description: A list of live courses
 */
router.get("/", liveCourseController.getAllLiveCourses);

/**
 * @swagger
 * /live-course/limit:
 *   get:
 *     summary: Get limited live courses
 *     tags: [Live Courses]
 *     responses:
 *       200:
 *         description: A subset of live courses
 */
router.get("/limit", liveCourseController.getLimitLiveCourses);

/**
 * @swagger
 * /live-course/{id}:
 *   get:
 *     summary: Get live course by ID
 *     tags: [Live Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Live course data
 */
router.get("/:id", liveCourseController.getLiveCourseById);

/**
 * @swagger
 * /live-course:
 *   post:
 *     summary: Create a new live course
 *     tags: [Live Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Live course created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveCourseController.createLiveCourse
);

/**
 * @swagger
 * /live-course/{id}:
 *   put:
 *     summary: Update a live course
 *     tags: [Live Courses]
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
 *         description: Live course updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveCourseController.updateLiveCourse
);

/**
 * @swagger
 * /live-course/{id}:
 *   delete:
 *     summary: Delete a live course
 *     tags: [Live Courses]
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
 *         description: Live course deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), liveCourseController.deleteLiveCourse);

module.exports = router;
