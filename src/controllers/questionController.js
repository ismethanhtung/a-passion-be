const questionService = require("../services/questionService");

const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitQuestions = async (req, res) => {
    try {
        const questions = await questionService.getLimitQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const questions = await questionService.getQuestionById(parseInt(id));
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createQuestion = async (req, res) => {
    try {
        const question = await questionService.createQuestion(req.body);
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await questionService.updateQuestion(parseInt(id), req.body);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuestion = await questionService.deleteQuestion(parseInt(id));
        res.status(200).json(deletedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllQuestions,
    getLimitQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};
