const express = require("express");
const router = express.Router();
const forumThreadController = require("../controllers/forumThreadController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", forumThreadController.getAllForumThreads);
router.get("/limit", forumThreadController.getLimitForumThreads);
router.get("/:id", forumThreadController.getForumThreadById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumThreadController.createForumThread
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    forumThreadController.updateForumThread
);
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    forumThreadController.deleteForumThread
);

module.exports = router;
