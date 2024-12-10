const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllLessons = async () => {
    return await prisma.lesson.findMany();
};

const getLessonById = async (id) => {
    return await prisma.lesson.findUnique({
        where: { id: parseInt(id) },
    });
};

const createLesson = async (data) => {
    try {
        const convertedData = stringToInt(data, ["courseId"]);
        return await prisma.lesson.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateLesson = async (id, data) => {
    const convertedData = stringToInt(data, ["courseId"]);
    return await prisma.lesson.update({
        where: { id: parseInt(id) },
        data: convertedData,
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
