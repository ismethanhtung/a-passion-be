const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", purchaseController.getAllPurchases);
router.get("/limit", purchaseController.getLimitPurchases);
router.get("/:id", purchaseController.getPurchaseById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    purchaseController.createPurchase
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    purchaseController.updatePurchase
);
router.delete("/:id", authenticate, authorizeRoles("admin"), purchaseController.deletePurchase);

module.exports = router;
