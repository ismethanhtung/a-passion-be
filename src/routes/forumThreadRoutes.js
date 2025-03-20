const express = require("express");
const router = express.Router();
const forumThreadController = require("../controllers/forumThreadController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /forum-thread:
 *   get:
 *     summary: Get all forum threads
 *     tags: [Forum Threads]
 *     responses:
 *       200:
 *         description: A list of forum threads
 */
router.get("/", forumThreadController.getAllForumThreads);

/**
 * @swagger
 * /forum-thread/limit:
 *   get:
 *     summary: Get limited forum threads
 *     tags: [Forum Threads]
 *     responses:
 *       200:
 *         description: A subset of forum threads
 */
router.get("/limit", forumThreadController.getLimitForumThreads);

/**
 * @swagger
 * /forum-thread/{id}:
 *   get:
 *     summary: Get forum thread by ID
 *     tags: [Forum Threads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Forum thread data
 */
router.get("/:id", forumThreadController.getForumThreadById);

/**
 * @swagger
 * /forum-thread:
 *   post:
 *     summary: Create a new forum thread
 *     tags: [Forum Threads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Forum thread created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumThreadController.createForumThread
);

/**
 * @swagger
 * /forum-thread/{id}:
 *   put:
 *     summary: Update a forum thread
 *     tags: [Forum Threads]
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
 *         description: Forum thread updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumThreadController.updateForumThread
);

/**
 * @swagger
 * /forum-thread/{id}:
 *   delete:
 *     summary: Delete a forum thread
 *     tags: [Forum Threads]
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
 *         description: Forum thread deleted
 */
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    forumThreadController.deleteForumThread
);

module.exports = router;
