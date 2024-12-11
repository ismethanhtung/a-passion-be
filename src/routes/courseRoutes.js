const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", courseController.getAllCourses);
router.get("/limit", courseController.getLimitCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", authenticate, authorizeRoles("admin", "teacher"), courseController.createCourse);
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), courseController.updateCourse);
router.delete("/:id", authenticate, authorizeRoles("admin"), courseController.deleteCourse);

module.exports = router;
