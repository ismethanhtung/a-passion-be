const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllLiveCourses = async () => {
    try {
        return await prisma.liveCourse.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getLiveCourseById = async (id) => {
    return await prisma.liveCourse.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createLiveCourse = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.liveCourse.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateLiveCourse = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.liveCourse.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteLiveCourse = async (id) => {
    return await prisma.liveCourse.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllLiveCourses,
    getLiveCourseById,
    createLiveCourse,
    updateLiveCourse,
    deleteLiveCourse,
};
