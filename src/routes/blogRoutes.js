const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 */
router.get("/", blogController.getAllBlogs);

/**
 * @swagger
 * /blogs/limit:
 *   get:
 *     summary: Get limited number of blogs
 *     tags: [Blog]
 */
router.get("/limit", blogController.getLimitBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blog]
 */
router.get("/:id", blogController.getBlogById);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 */
router.post("/", authenticate, blogController.createBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update an existing blog
 *     tags: [Blog]
 */
router.put("/:id", authenticate, blogController.updateBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blog]
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), blogController.deleteBlog);
module.exports = router;
