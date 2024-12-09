const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllLessons = async () => {
    return await prisma.lesson.findMany();
};

const getLessonById = async (id) => {
    return await prisma.lesson.findUnique({
        where: { id: parseInt(id) },
    });
};

const createLesson = async (data) => {
    return await prisma.lesson.create({ data });
};

const updateLesson = async (id, data) => {
    return await prisma.lesson.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteLesson = async (id) => {
    return await prisma.lesson.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
};
