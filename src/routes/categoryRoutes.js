const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", authenticate, authorizeRoles("admin"), categoryController.createCategory);
router.put("/:id", authenticate, authorizeRoles("admin"), categoryController.updateCategory);
router.delete("/:id", authenticate, authorizeRoles("admin"), categoryController.deleteCategory);

module.exports = router;
