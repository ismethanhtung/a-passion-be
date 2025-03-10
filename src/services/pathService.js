const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllPaths = async () => {
    return await prisma.path.findMany({
        include: {
            role: true,
        },
    });
};

const getPathById = async (id) => {
    try {
        return await prisma.learningPath.findFirst({
            where: { userId: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

const createPath = async (data) => {
    return await prisma.learningPath.create({ data });
};

const updatePath = async (userId, data) => {
    try {
        const existingPath = await prisma.learningPath.findFirst({
            where: { userId: parseInt(userId) },
        });

        if (existingPath) {
            return await prisma.learningPath.update({
                where: { id: existingPath.id },
                data,
            });
        } else {
            return await prisma.learningPath.create({
                data: { userId: parseInt(userId), ...data },
            });
        }
    } catch (error) {
        console.error("Lỗi khi upsert learningPath:", error);
        throw error;
    }
};

const deletePath = async (id) => {
    try {
        return await prisma.path.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllPaths,
    getPathById,
    createPath,
    updatePath,
    deletePath,
};
