const express = require("express");
const router = express.Router();
const liveSessionController = require("../controllers/liveSessionController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * /live-session:
 *   get:
 *     summary: Get all live sessions
 *     tags: [Live Sessions]
 *     responses:
 *       200:
 *         description: A list of live sessions
 */
router.get("/", liveSessionController.getAllLiveSessions);

/**
 * @swagger
 * /live-session/limit:
 *   get:
 *     summary: Get limited live sessions
 *     tags: [Live Sessions]
 *     responses:
 *       200:
 *         description: A subset of live sessions
 */
router.get("/limit", liveSessionController.getLimitLiveSessions);

/**
 * @swagger
 * /live-session/{id}:
 *   get:
 *     summary: Get live session by ID
 *     tags: [Live Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Live session data
 */
router.get("/:id", liveSessionController.getLiveSessionById);

/**
 * @swagger
 * /live-session:
 *   post:
 *     summary: Create a new live session
 *     tags: [Live Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Live session created
 */
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveSessionController.createLiveSession
);

/**
 * @swagger
 * /live-session/{id}:
 *   put:
 *     summary: Update a live session
 *     tags: [Live Sessions]
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
 *         description: Live session updated
 */
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveSessionController.updateLiveSession
);

/**
 * @swagger
 * /live-session/{id}:
 *   delete:
 *     summary: Delete a live session
 *     tags: [Live Sessions]
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
 *         description: Live session deleted
 */
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    liveSessionController.deleteLiveSession
);

module.exports = router;
