const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", paymentController.getAllPayments);
router.get("/limit", paymentController.getLimitPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), paymentController.createPayment);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    paymentController.updatePayment
);
router.delete("/:id", authenticate, authorizeRoles("admin"), paymentController.deletePayment);

module.exports = router;
