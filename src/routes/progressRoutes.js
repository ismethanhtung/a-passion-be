const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", progressController.getAllProgress);
router.get("/limit", progressController.getLimitProgress);
router.get("/:id", progressController.getProgressById);
router.post("/", authenticate, progressController.createProgress);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    progressController.updateProgress
);
router.delete("/:id", authenticate, authorizeRoles("admin"), progressController.deleteProgress);

module.exports = router;
