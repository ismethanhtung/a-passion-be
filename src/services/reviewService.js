const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
        return await prisma.review.create({
            data: {
                userId: req.user.id,
                courseId,
                rating,
                comment,
                // user: req.user,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateReview = async (id, data) => {
    return await prisma.review.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteReview = async (id) => {
    return await prisma.review.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllReviews,
    getReviewByCourseId,
    createReview,
    updateReview,
    deleteReview,
};
