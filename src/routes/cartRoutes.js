const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/:id", authenticate, cartController.getCartById);
router.post("/", authenticate, cartController.createCart);
router.put("/:id", authenticate, cartController.updateCart);
router.delete("/:id", authenticate, authorizeRoles("admin"), cartController.deleteCart);

module.exports = router;
