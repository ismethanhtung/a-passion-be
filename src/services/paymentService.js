const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllPayments = async () => {
    try {
        return await prisma.payment.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getPaymentById = async (id) => {
    return await prisma.payment.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createPayment = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.payment.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updatePayment = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.payment.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deletePayment = async (id) => {
    return await prisma.payment.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};
