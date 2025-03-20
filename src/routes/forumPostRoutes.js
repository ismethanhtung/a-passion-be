const express = require("express");
const router = express.Router();
const forumPostController = require("../controllers/forumPostController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /forum-post:
 *   get:
 *     summary: Get all forum posts
 *     tags: [Forum Posts]
 *     responses:
 *       200:
 *         description: A list of forum posts
 */
router.get("/", forumPostController.getAllForumPosts);

/**
 * @swagger
 * /forum-post/limit:
 *   get:
 *     summary: Get limited forum posts
 *     tags: [Forum Posts]
 *     responses:
 *       200:
 *         description: A subset of forum posts
 */
router.get("/limit", forumPostController.getLimitForumPosts);

/**
 * @swagger
 * /forum-post/{id}:
 *   get:
 *     summary: Get forum post by ID
 *     tags: [Forum Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Forum post data
 */
router.get("/:id", forumPostController.getForumPostById);

/**
 * @swagger
 * /forum-post:
 *   post:
 *     summary: Create a new forum post
 *     tags: [Forum Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Forum post created
 */
router.post("/", authenticate, forumPostController.createForumPost);

/**
 * @swagger
 * /forum-post/{id}:
 *   put:
 *     summary: Update a forum post
 *     tags: [Forum Posts]
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
 *         description: Forum post updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumPostController.updateForumPost
);

/**
 * @swagger
 * /forum-post/{id}:
 *   delete:
 *     summary: Delete a forum post
 *     tags: [Forum Posts]
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
 *         description: Forum post deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), forumPostController.deleteForumPost);

module.exports = router;
