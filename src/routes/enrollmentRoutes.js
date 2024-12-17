const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", enrollmentController.getAllEnrollments);
router.get("/limit", enrollmentController.getLimitEnrollments);
router.get("/:id", enrollmentController.getEnrollmentById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    enrollmentController.createEnrollment
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    enrollmentController.updateEnrollment
);
router.delete("/:id", authenticate, authorizeRoles("admin"), enrollmentController.deleteEnrollment);

module.exports = router;
