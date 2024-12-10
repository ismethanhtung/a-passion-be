const lessonService = require("../services/lessonService");

const getLessons = async (req, res) => {
    try {
        const lessons = await lessonService.getAllLessons();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLessonById = async (req, res) => {
    const { id } = req.params;
    try {
        const lessons = await lessonService.getLessonById(parseInt(id));
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLesson = async (req, res) => {
    try {
        const lesson = await lessonService.createLesson(req.body);
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await lessonService.updateLesson(parseInt(id), req.body);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLesson = await lessonService.deleteLesson(parseInt(id));
        res.status(200).json(deletedLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
};
