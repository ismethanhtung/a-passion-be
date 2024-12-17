const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getCartById = async (id) => {
    return await prisma.cart.findUnique({
        where: { userId: parseInt(id) },
        include: { include: { course: true } },
    });
};

const createCart = async (userId, courseId, quantity) => {
    try {
        const existingCart = await prisma.cart.findFirst({
            where: { userId },
        });
        if (existingCart) {
            const updatedCart = await prisma.cart.update({
                where: { id: existingCart.id },
                data: { quantity: existingCart.quantity + quantity },
            });
            return res.json(updatedCart);
        }
        const newCart = await prisma.cart.create({
            data: { userId, courseId, quantity },
        });

        return json(newCart);
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
