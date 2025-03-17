const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");
const updateCourseRating = require("../utils/calculateRating");

const getAllReviews = async () => {
    return await prisma.review.findMany();
};

const getReviewByCourseId = async (id) => {
    return await prisma.review.findMany({
        where: { courseId: parseInt(id) },
        include: { user: { select: { name: true } } },
    });
};

const createReview = async (req) => {
    const { courseId, rating, comment } = req.body;

    try {
        const review = await prisma.review.create({
            data: { userId: req.user.userId, courseId, rating, comment },
        });

        await updateCourseRating(courseId);
        return review;
    } catch (error) {
        console.log(error);
    }
};

const updateReview = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["userId", "courseId", "rating"]);

        const review = await prisma.review.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });

        await updateCourseRating(review.courseId);
        return review;
    } catch (error) {
        console.log(error);
    }
};

const deleteReview = async (id) => {
    try {
        const review = await prisma.review.delete({
            where: { id: parseInt(id) },
        });

        await updateCourseRating(review.courseId);
        return review;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllReviews,
    getReviewByCourseId,
    createReview,
    updateReview,
    deleteReview,
};
