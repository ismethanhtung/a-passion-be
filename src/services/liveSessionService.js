const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllLiveSessions = async () => {
    try {
        return await prisma.liveSession.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getLiveSessionById = async (id) => {
    return await prisma.liveSession.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createLiveSession = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.liveSession.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateLiveSession = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.liveSession.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteLiveSession = async (id) => {
    return await prisma.liveSession.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllLiveSessions,
    getLiveSessionById,
    createLiveSession,
    updateLiveSession,
    deleteLiveSession,
};
