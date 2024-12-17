const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllBlogs = async () => {
    try {
        return await prisma.blog.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getBlogById = async (id) => {
    return await prisma.blog.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createBlog = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.blog.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateBlog = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.blog.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteBlog = async (id) => {
    return await prisma.blog.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};
