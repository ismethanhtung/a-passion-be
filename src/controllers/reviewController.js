const reviewService = require("../services/reviewService");

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewByCourseId = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await reviewService.getReviewByCourseId(parseInt(id));
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview(req);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await reviewService.updateReview(parseInt(id), req.body);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await reviewService.deleteReview(parseInt(id));
        res.status(200).json(deletedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewByCourseId,
    createReview,
    updateReview,
    deleteReview,
};
