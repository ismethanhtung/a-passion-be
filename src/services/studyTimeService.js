const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllStudyTimes = async () => {
    try {
        return await prisma.studyTime.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getStudyTimeById = async (id) => {
    return await prisma.studyTime.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createStudyTime = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.studyTime.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateStudyTime = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.studyTime.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteStudyTime = async (id) => {
    return await prisma.studyTime.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllStudyTimes,
    getStudyTimeById,
    createStudyTime,
    updateStudyTime,
    deleteStudyTime,
};
