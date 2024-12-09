const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticate = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", authenticate, reviewController.getAllReviews);
router.get("/:id", authenticate, reviewController.getReviewByCourseId);
router.post("/", reviewController.createReview);
router.put("/:id", authenticate, reviewController.updateReview);
router.delete("/:id", authenticate, reviewController.deleteReview);

module.exports = router;
