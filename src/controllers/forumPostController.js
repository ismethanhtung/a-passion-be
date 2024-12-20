const forumPostService = require("../services/forumPostService");

const getAllForumPosts = async (req, res) => {
    try {
        const forumPosts = await forumPostService.getAllForumPosts();
        res.status(200).json(forumPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitForumPosts = async (req, res) => {
    try {
        const forumPosts = await forumPostService.getLimitForumPosts();
        res.status(200).json(forumPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getForumPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const forumPosts = await forumPostService.getForumPostById(parseInt(id));
        res.status(200).json(forumPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createForumPost = async (req, res) => {
    try {
        req.body.authorId = req.user.userId;
        const forumPost = await forumPostService.createForumPost(req.body);
        res.status(201).json(forumPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateForumPost = async (req, res) => {
    const { id } = req.params;
    try {
        const forumPost = await forumPostService.updateForumPost(parseInt(id), req.body);
        res.status(200).json(forumPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteForumPost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedForumPost = await forumPostService.deleteForumPost(parseInt(id));
        res.status(200).json(deletedForumPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllForumPosts,
    getLimitForumPosts,
    getForumPostById,
    createForumPost,
    updateForumPost,
    deleteForumPost,
};
