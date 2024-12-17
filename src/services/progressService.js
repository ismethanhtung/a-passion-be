const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllProgress = async () => {
    try {
        return await prisma.progress.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getProgressById = async (id) => {
    return await prisma.progress.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createProgress = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.progress.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateProgress = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.progress.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteProgress = async (id) => {
    return await prisma.progress.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllProgress,
    getProgressById,
    createProgress,
    updateProgress,
    deleteProgress,
};
