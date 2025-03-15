const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

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
        console.log(29384239);
        return await prisma.review.create({
            data: {
                userId: req.user.userId,
                courseId: courseId,
                rating,
                comment,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateReview = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["userId", "courseId", "rating"]);

        return await prisma.review.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteReview = async (id) => {
    try {
        return await prisma.review.delete({
            where: { id: parseInt(id) },
        });
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
