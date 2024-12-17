const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllForumThreads = async () => {
    try {
        return await prisma.forumThread.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getForumThreadById = async (id) => {
    try {
        return await prisma.forumThread.findUnique({
            where: { id: parseInt(id) },
            include: { forumPosts: true },
        });
    } catch (error) {
        console.log(error);
    }
};

const createForumThread = async (data) => {
    try {
        const convertedData = stringToInt(data, ["authorId"]);
        return await prisma.forumThread.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateForumThread = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["authorId", "teacherId", "price", "newPrice"]);

        return await prisma.forumThread.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteForumThread = async (id) => {
    return await prisma.forumThread.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllForumThreads,
    getForumThreadById,
    createForumThread,
    updateForumThread,
    deleteForumThread,
};
