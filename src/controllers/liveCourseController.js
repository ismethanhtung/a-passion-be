const liveCourseService = require("../services/liveCourseService");

const getAllLiveCourses = async (req, res) => {
    try {
        const liveCourses = await liveCourseService.getAllLiveCourses();
        res.status(200).json(liveCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitLiveCourses = async (req, res) => {
    try {
        const liveCourses = await liveCourseService.getLimitLiveCourses();
        res.status(200).json(liveCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLiveCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const liveCourses = await liveCourseService.getLiveCourseById(parseInt(id));
        res.status(200).json(liveCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLiveCourse = async (req, res) => {
    try {
        const liveCourse = await liveCourseService.createLiveCourse(req.body);
        res.status(201).json(liveCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLiveCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const liveCourse = await liveCourseService.updateLiveCourse(parseInt(id), req.body);
        res.status(200).json(liveCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLiveCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLiveCourse = await liveCourseService.deleteLiveCourse(parseInt(id));
        res.status(200).json(deletedLiveCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLiveCourses,
    getLimitLiveCourses,
    getLiveCourseById,
    createLiveCourse,
    updateLiveCourse,
    deleteLiveCourse,
};
