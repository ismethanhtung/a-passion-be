const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllQuestions = async () => {
    try {
        return await prisma.question.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getQuestionById = async (id) => {
    return await prisma.question.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createQuestion = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.question.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateQuestion = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.question.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteQuestion = async (id) => {
    return await prisma.question.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};
