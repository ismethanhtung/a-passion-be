const forumThreadService = require("../services/forumThreadService");

const getAllForumThreads = async (req, res) => {
    try {
        const forumThreads = await forumThreadService.getAllForumThreads();
        res.status(200).json(forumThreads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitForumThreads = async (req, res) => {
    try {
        const forumThreads = await forumThreadService.getLimitForumThreads();
        res.status(200).json(forumThreads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getForumThreadById = async (req, res) => {
    const { id } = req.params;
    try {
        const forumThreads = await forumThreadService.getForumThreadById(parseInt(id));
        res.status(200).json(forumThreads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createForumThread = async (req, res) => {
    try {
        const forumThread = await forumThreadService.createForumThread(req.body);
        res.status(201).json(forumThread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateForumThread = async (req, res) => {
    const { id } = req.params;
    try {
        const forumThread = await forumThreadService.updateForumThread(parseInt(id), req.body);
        res.status(200).json(forumThread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteForumThread = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedForumThread = await forumThreadService.deleteForumThread(parseInt(id));
        res.status(200).json(deletedForumThread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllForumThreads,
    getLimitForumThreads,
    getForumThreadById,
    createForumThread,
    updateForumThread,
    deleteForumThread,
};
