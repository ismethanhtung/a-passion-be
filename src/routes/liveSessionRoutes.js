const express = require("express");
const router = express.Router();
const liveSessionController = require("../controllers/liveSessionController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", liveSessionController.getAllLiveSessions);
router.get("/limit", liveSessionController.getLimitLiveSessions);
router.get("/:id", liveSessionController.getLiveSessionById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveSessionController.createLiveSession
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    liveSessionController.updateLiveSession
);
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    liveSessionController.deleteLiveSession
);

module.exports = router;
