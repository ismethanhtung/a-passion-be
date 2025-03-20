const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Cart]
 */
router.get("/:id", authenticate, cartController.getCartById);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a cart
 *     tags: [Cart]
 */
router.post("/", authenticate, cartController.createCart);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update a cart
 *     tags: [Cart]
 */
router.put("/:id", authenticate, cartController.updateCart);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete a cart
 *     tags: [Cart]
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), cartController.deleteCart);

module.exports = router;
