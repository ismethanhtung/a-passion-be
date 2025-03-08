const pathService = require("../services/pathService");

const getAllPaths = async (req, res) => {
    try {
        const paths = await pathService.getAllPaths();
        res.status(200).json(paths);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPathById = async (req, res) => {
    const { id } = req.params;
    try {
        const path = await pathService.getPathById(parseInt(id));
        res.status(200).json(path);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPath = async (req, res) => {
    try {
        const path = await pathService.createPath(req.body);
        res.status(201).json(path);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePath = async (req, res) => {
    const { id } = req.params;
    try {
        const path = await pathService.updatePath(parseInt(id), req.body);
        res.status(200).json(path);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deletePath = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPath = await pathService.deletePath(parseInt(id));
        res.status(200).json(deletedPath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPaths,
    getPathById,
    createPath,
    updatePath,
    deletePath,
};
