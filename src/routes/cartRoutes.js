const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/:id", authenticate, cartController.getCartById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), cartController.createCart);
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), cartController.updateCart);
router.delete("/:id", authenticate, authorizeRoles("admin"), cartController.deleteCart);

module.exports = router;
