const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllCourses = async () => {
    try {
        return await prisma.course.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getLimitCourses = async (count) => {
    return await prisma.course.findMany({ skip: 1, take: 4 });
};

const getCourseById = async (id) => {
    return await prisma.course.findUnique({
        where: { id: parseInt(id) },
        include: {
            lessons: true,
            reviews: true,
        },
    });
};

const createCourse = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.course.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateCourse = async (id, data) => {
    try {
        const convertedData = stringToInt(data, [
            "categoryId",
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
        ]);

        return await prisma.course.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteCourse = async (id) => {
    return await prisma.course.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getLimitCourses,
};
