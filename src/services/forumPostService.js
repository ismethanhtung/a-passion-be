const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllForumPosts = async () => {
    try {
        return await prisma.forumPost.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getForumPostById = async (id) => {
    return await prisma.forumPost.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createForumPost = async (data, authorId) => {
    try {
        const convertedData = stringToInt(data, ["threadId", "authorId"]);
        return await prisma.forumPost.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateForumPost = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.forumPost.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteForumPost = async (id) => {
    return await prisma.forumPost.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllForumPosts,
    getForumPostById,
    createForumPost,
    updateForumPost,
    deleteForumPost,
};
