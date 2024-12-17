const progressService = require("../services/progressService");

const getAllProgress = async (req, res) => {
    try {
        const progress = await progressService.getAllProgress();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitProgress = async (req, res) => {
    try {
        const progress = await progressService.getLimitProgress();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProgressById = async (req, res) => {
    const { id } = req.params;
    try {
        const progress = await progressService.getProgressById(parseInt(id));
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProgress = async (req, res) => {
    try {
        const progress = await progressService.createProgress(req.body);
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const progress = await progressService.updateProgress(parseInt(id), req.body);
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProgress = await progressService.deleteProgress(parseInt(id));
        res.status(200).json(deletedProgress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProgress,
    getLimitProgress,
    getProgressById,
    createProgress,
    updateProgress,
    deleteProgress,
};
