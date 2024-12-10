const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllCategories = async () => {
    return await prisma.category.findMany();
};

const getCategoryById = async (id) => {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
    });
};

const createCategory = async (data) => {
    try {
        const convertedData = stringToInt(data, ["parentId", "id"]);
        return await prisma.category.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateCategory = async (id, data) => {
    const convertedData = stringToInt(data, ["parentId", "id"]);

    return await prisma.category.update({
        where: { id: parseInt(id) },
        data: convertedData,
    });
};

const deleteCategory = async (id) => {
    try {
        return await prisma.category.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
