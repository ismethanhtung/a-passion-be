const blogService = require("../services/blogService");

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getLimitBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blogs = await blogService.getBlogById(parseInt(id));
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const blog = await blogService.createBlog(req.body);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await blogService.updateBlog(parseInt(id), req.body);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await blogService.deleteBlog(parseInt(id));
        res.status(200).json(deletedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getLimitBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};
