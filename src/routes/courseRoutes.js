const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authenticate = require("../middlewares/authMiddleware");
// const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", authenticate, courseController.createCourse);
router.put("/:id", authenticate, courseController.updateCourse);
router.delete("/:id", authenticate, courseController.deleteCourse);

module.exports = router;
