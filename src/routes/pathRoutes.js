const express = require("express");
const router = express.Router();
const PathController = require("../controllers/pathController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /path:
 *   get:
 *     summary: Get all paths (Admin only)
 *     tags: [Paths]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of paths
 */
router.get("/", authenticate, authorizeRoles("admin"), PathController.getAllPaths);

/**
 * @swagger
 * /path/{id}:
 *   get:
 *     summary: Get path by ID
 *     tags: [Paths]
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
 *         description: Path data
 */
router.get("/:id", authenticate, PathController.getPathById);

/**
 * @swagger
 * /path:
 *   post:
 *     summary: Create a new path
 *     tags: [Paths]
 *     responses:
 *       201:
 *         description: Path created
 */
router.post("/", PathController.createPath);

/**
 * @swagger
 * /path/{id}:
 *   put:
 *     summary: Update a path
 *     tags: [Paths]
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
 *         description: Path updated
 */
router.put("/:id", authenticate, PathController.updatePath);

/**
 * @swagger
 * /path/{id}:
 *   delete:
 *     summary: Delete a path (Admin only)
 *     tags: [Paths]
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
 *         description: Path deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), PathController.deletePath);

module.exports = router;
