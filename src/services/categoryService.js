const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCategories = async () => {
    return await prisma.category.findMany();
};

const getCategoryById = async (id) => {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
    });
};

const createCategory = async (data) => {
    return await prisma.category.create({ data });
};

const updateCategory = async (id, data) => {
    return await prisma.category.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
