const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllNotifications = async () => {
    try {
        return await prisma.notification.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getNotificationById = async (id) => {
    return await prisma.notification.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createNotification = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.notification.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateNotification = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.notification.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteNotification = async (id) => {
    return await prisma.notification.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
};
