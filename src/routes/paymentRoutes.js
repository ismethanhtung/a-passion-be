const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: A list of payments
 */
router.get("/", paymentController.getAllPayments);

/**
 * @swagger
 * /payment/limit:
 *   get:
 *     summary: Get limited payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: A subset of payments
 */
router.get("/limit", paymentController.getLimitPayments);

/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment data
 */
router.get("/:id", paymentController.getPaymentById);

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment created
 */
router.post("/", authenticate, authorizeRoles("admin", "teacher"), paymentController.createPayment);

/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    paymentController.updatePayment
);

/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete a payment (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), paymentController.deletePayment);

module.exports = router;
