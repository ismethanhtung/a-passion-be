const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /enrollment:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: A list of enrollments
 */
router.get("/", enrollmentController.getAllEnrollments);

/**
 * @swagger
 * /enrollment/limit:
 *   get:
 *     summary: Get limited enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: A subset of enrollments
 */
router.get("/limit", enrollmentController.getLimitEnrollments);

/**
 * @swagger
 * /enrollment/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Enrollment data
 */
router.get("/:id", enrollmentController.getEnrollmentById);

/**
 * @swagger
 * /enrollment:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Enrollment created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    enrollmentController.createEnrollment
);

/**
 * @swagger
 * /enrollment/{id}:
 *   put:
 *     summary: Update an enrollment
 *     tags: [Enrollments]
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
 *         description: Enrollment updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    enrollmentController.updateEnrollment
);

/**
 * @swagger
 * /enrollment/{id}:
 *   delete:
 *     summary: Delete an enrollment
 *     tags: [Enrollments]
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
 *         description: Enrollment deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), enrollmentController.deleteEnrollment);

module.exports = router;
