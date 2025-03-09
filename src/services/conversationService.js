const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllConversations = async () => {
    return await prisma.conversation.findMany();
};

const getConversationByUserId = async (id) => {
    return await prisma.conversation.findMany({
        where: { userId: parseInt(id) },
        // include: { user: { select: { name: true } } },
    });
};

const createConversation = async (req) => {
    const { courseId, rating, comment } = req.body;

    try {
        return await prisma.conversation.create({
            data: {
                userId: req.user.userId,
                courseId: courseId,
                rating,
                comment,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateConversation = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["userId", "courseId", "rating"]);

        return await prisma.conversation.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteConversation = async (id) => {
    try {
        return await prisma.conversation.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllConversations,
    getConversationByUserId,
    createConversation,
    updateConversation,
    deleteConversation,
};
