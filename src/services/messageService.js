const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllMessages = async () => {
    try {
        return await prisma.message.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getMessageById = async (id) => {
    return await prisma.message.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createMessage = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.message.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateMessage = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.message.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteMessage = async (id) => {
    return await prisma.message.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
};
