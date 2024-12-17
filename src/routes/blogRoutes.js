const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", blogController.getAllBlogs);
router.get("/limit", blogController.getLimitBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), blogController.createBlog);
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), blogController.updateBlog);
router.delete("/:id", authenticate, authorizeRoles("admin"), blogController.deleteBlog);

module.exports = router;
