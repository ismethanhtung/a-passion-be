const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewByCourseId);
router.post("/", authenticate, reviewController.createReview);
router.put("/:id", authenticate, reviewController.updateReview);
router.delete("/:id", authenticate, reviewController.deleteReview);

module.exports = router;
