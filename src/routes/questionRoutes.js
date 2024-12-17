const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", questionController.getAllQuestions);
router.get("/limit", questionController.getLimitQuestions);
router.get("/:id", questionController.getQuestionById);
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "teacher"),
    questionController.createQuestion
);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    questionController.updateQuestion
);
router.delete("/:id", authenticate, authorizeRoles("admin"), questionController.deleteQuestion);

module.exports = router;
