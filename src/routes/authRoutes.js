const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/google-login", authController.loginWithGoogle);
router.put("/change-password", authenticate, authController.changePassword);
router.get("/verify-email", authController.verifyEmail);

module.exports = router;
