const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllPurchases = async () => {
    try {
        return await prisma.purchase.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getPurchaseById = async (id) => {
    return await prisma.purchase.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createPurchase = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.purchase.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updatePurchase = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.purchase.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deletePurchase = async (id) => {
    return await prisma.purchase.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
};
