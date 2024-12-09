const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCourses = async () => {
    return await prisma.course.findMany();
};

const getCourseById = async (id) => {
    return await prisma.course.findUnique({
        where: { id: parseInt(id) },
        include: {
            lessons: true,
            reviews: true,
        },
    });
};

const createCourse = async (data) => {
    return await prisma.course.create({ data });
};

const updateCourse = async (id, data) => {
    return await prisma.course.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteCourse = async (id) => {
    return await prisma.course.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
