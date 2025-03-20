const express = require("express");
const router = express.Router();
const studyTimeController = require("../controllers/studyTimeController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /studyTimes:
 *   get:
 *     summary: Get all study times
 *     tags: [StudyTimes]
 *     responses:
 *       200:
 *         description: A list of study times
 */
router.get("/", studyTimeController.getAllStudyTimes);

/**
 * @swagger
 * /studyTimes/{id}:
 *   get:
 *     summary: Get study time by ID
 *     tags: [StudyTimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A study time record
 */
router.get("/:id", studyTimeController.getStudyTimeById);

/**
 * @swagger
 * /studyTimes:
 *   post:
 *     summary: Create a new study time
 *     tags: [StudyTimes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Study time created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    studyTimeController.createStudyTime
);

/**
 * @swagger
 * /studyTimes/{id}:
 *   put:
 *     summary: Update a study time
 *     tags: [StudyTimes]
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
 *         description: Study time updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    studyTimeController.updateStudyTime
);

/**
 * @swagger
 * /studyTimes/{id}:
 *   delete:
 *     summary: Delete a study time
 *     tags: [StudyTimes]
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
 *         description: Study time deleted
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), studyTimeController.deleteStudyTime);

module.exports = router;
