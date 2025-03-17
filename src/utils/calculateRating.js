const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateCourseRating = async (courseId) => {
    const result = await prisma.review.aggregate({
        where: { courseId },
        _avg: { rating: true },
    });

    await prisma.course.update({
        where: { id: courseId },
        data: { averageRating: result._avg.rating || 0 },
    });
};

module.exports = updateCourseRating;
