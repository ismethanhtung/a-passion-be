const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllTests = async () => {
    try {
        return await prisma.test.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getTestById = async (id) => {
    return await prisma.test.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createTest = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.test.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateTest = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.test.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTest = async (id) => {
    return await prisma.test.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllTests,
    getTestById,
    createTest,
    updateTest,
    deleteTest,
};
