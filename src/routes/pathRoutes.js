const express = require("express");
const router = express.Router();
const PathController = require("../controllers/pathController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", authenticate, authorizeRoles("admin"), PathController.getAllPaths);
router.get("/:id", authenticate, PathController.getPathById);
router.post("/", PathController.createPath);
router.put("/:id", authenticate, PathController.updatePath);
router.delete("/:id", authenticate, authorizeRoles("admin"), PathController.deletePath);

module.exports = router;
