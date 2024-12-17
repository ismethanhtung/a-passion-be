const studyTimeService = require("../services/studyTimeService");

const getAllStudyTimes = async (req, res) => {
    try {
        const studyTimes = await studyTimeService.getAllStudyTimes();
        res.status(200).json(studyTimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitStudyTimes = async (req, res) => {
    try {
        const studyTimes = await studyTimeService.getLimitStudyTimes();
        res.status(200).json(studyTimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudyTimeById = async (req, res) => {
    const { id } = req.params;
    try {
        const studyTimes = await studyTimeService.getStudyTimeById(parseInt(id));
        res.status(200).json(studyTimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createStudyTime = async (req, res) => {
    try {
        const studyTime = await studyTimeService.createStudyTime(req.body);
        res.status(201).json(studyTime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStudyTime = async (req, res) => {
    const { id } = req.params;
    try {
        const studyTime = await studyTimeService.updateStudyTime(parseInt(id), req.body);
        res.status(200).json(studyTime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteStudyTime = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudyTime = await studyTimeService.deleteStudyTime(parseInt(id));
        res.status(200).json(deletedStudyTime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllStudyTimes,
    getLimitStudyTimes,
    getStudyTimeById,
    createStudyTime,
    updateStudyTime,
    deleteStudyTime,
};
