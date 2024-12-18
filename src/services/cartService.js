const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getCartById = async (id) => {
    try {
        return await prisma.cart.findMany({
            where: { userId: parseInt(id) },
            include: { course: true },
        });
    } catch (error) {
        console.log(error);
    }
};

const createCart = async (data) => {
    try {
        console.log(data);
        const convertedData = stringToInt(data, ["userId", "courseId", "quantity"]);
        const existingCart = await prisma.cart.findFirst({
            where: { userId: convertedData.userId, courseId: convertedData.courseId },
        });
        if (existingCart) {
            return await prisma.cart.update({
                where: { id: existingCart.id },
                data: { quantity: existingCart.quantity + convertedData.quantity },
            });
        }
        return await prisma.cart.create({
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const updateCart = async (id, data) => {
    try {
        const convertedData = stringToInt(data, [
            "categoryId",
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
        ]);

        return await prisma.cart.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteCart = async (id) => {
    return await prisma.cart.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};
