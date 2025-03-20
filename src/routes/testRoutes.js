const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Get all tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: A list of tests
 */
router.get("/", testController.getAllTests);

/**
 * @swagger
 * /tests/limit:
 *   get:
 *     summary: Get a limited number of tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: A limited number of tests
 */
router.get("/limit", testController.getLimitTests);

/**
 * @swagger
 * /tests/{id}:
 *   get:
 *     summary: Get a test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A test object
 */
router.get("/:id", testController.getTestById);

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Create a new test
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Test created
 */
router.post("/", authenticate, authorizeRoles("admin", "teacher"), testController.createTest);

/**
 * @swagger
 * /tests/{id}:
 *   put:
 *     summary: Update a test
 *     tags: [Tests]
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
 *         description: Test updated
 */
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), testController.updateTest);

/**
 * @swagger
 * /tests/{id}:
 *   delete:
 *     summary: Delete a test
 *     tags: [Tests]
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
 *         description: Test deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), testController.deleteTest);

module.exports = router;
