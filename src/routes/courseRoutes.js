const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", courseController.getAllCourses);

/**
 * @swagger
 * /course/limit:
 *   get:
 *     summary: Get limited courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A subset of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/limit", courseController.getLimitCourses);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/:id", courseController.getCourseById);

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to Node.js
 *               description:
 *                 type: string
 *                 example: A comprehensive course on Node.js development.
 *               teacherId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post("/", authenticate, authorizeRoles("admin", "teacher"), courseController.createCourse);

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced Node.js
 *               description:
 *                 type: string
 *                 example: An advanced course on Node.js techniques.
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), courseController.updateCourse);

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID to delete
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), courseController.deleteCourse);

module.exports = router;
