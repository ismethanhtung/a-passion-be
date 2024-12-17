const liveSessionService = require("../services/liveSessionService");

const getAllLiveSessions = async (req, res) => {
    try {
        const liveSessions = await liveSessionService.getAllLiveSessions();
        res.status(200).json(liveSessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitLiveSessions = async (req, res) => {
    try {
        const liveSessions = await liveSessionService.getLimitLiveSessions();
        res.status(200).json(liveSessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLiveSessionById = async (req, res) => {
    const { id } = req.params;
    try {
        const liveSessions = await liveSessionService.getLiveSessionById(parseInt(id));
        res.status(200).json(liveSessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLiveSession = async (req, res) => {
    try {
        const liveSession = await liveSessionService.createLiveSession(req.body);
        res.status(201).json(liveSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLiveSession = async (req, res) => {
    const { id } = req.params;
    try {
        const liveSession = await liveSessionService.updateLiveSession(parseInt(id), req.body);
        res.status(200).json(liveSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLiveSession = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLiveSession = await liveSessionService.deleteLiveSession(parseInt(id));
        res.status(200).json(deletedLiveSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLiveSessions,
    getLimitLiveSessions,
    getLiveSessionById,
    createLiveSession,
    updateLiveSession,
    deleteLiveSession,
};
