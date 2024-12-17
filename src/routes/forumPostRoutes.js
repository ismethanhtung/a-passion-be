const express = require("express");
const router = express.Router();
const forumPostController = require("../controllers/forumPostController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", forumPostController.getAllForumPosts);
router.get("/limit", forumPostController.getLimitForumPosts);
router.get("/:id", forumPostController.getForumPostById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumPostController.createForumPost
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumPostController.updateForumPost
);
router.delete("/:id", authenticate, authorizeRoles("admin"), forumPostController.deleteForumPost);

module.exports = router;
