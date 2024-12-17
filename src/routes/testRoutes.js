const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", testController.getAllTests);
router.get("/limit", testController.getLimitTests);
router.get("/:id", testController.getTestById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), testController.createTest);
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), testController.updateTest);
router.delete("/:id", authenticate, authorizeRoles("admin"), testController.deleteTest);

module.exports = router;
