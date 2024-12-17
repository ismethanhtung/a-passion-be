const express = require("express");
const router = express.Router();
const studyTimeController = require("../controllers/studyTimeController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", studyTimeController.getAllStudyTimes);
router.get("/limit", studyTimeController.getLimitStudyTimes);
router.get("/:id", studyTimeController.getStudyTimeById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    studyTimeController.createStudyTime
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    studyTimeController.updateStudyTime
);
router.delete("/:id", authenticate, authorizeRoles("admin"), studyTimeController.deleteStudyTime);

module.exports = router;
