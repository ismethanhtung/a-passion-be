const express = require("express");
const router = express.Router();
const liveCourseController = require("../controllers/liveCourseController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", liveCourseController.getAllLiveCourses);
router.get("/limit", liveCourseController.getLimitLiveCourses);
router.get("/:id", liveCourseController.getLiveCourseById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveCourseController.createLiveCourse
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveCourseController.updateLiveCourse
);
router.delete("/:id", authenticate, authorizeRoles("admin"), liveCourseController.deleteLiveCourse);

module.exports = router;
