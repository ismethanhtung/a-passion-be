const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllEnrollments = async () => {
    try {
        return await prisma.enrollment.findMany();
    } catch (error) {
        console.log(error);
    }
};

const getEnrollmentById = async (id) => {
    return await prisma.enrollment.findUnique({
        where: { id: parseInt(id) },
        include: {},
    });
};

const createEnrollment = async (data) => {
    try {
        const convertedData = stringToInt(data, [
            "creatorId",
            "teacherId",
            "price",
            "newPrice",
            "categoryId",
        ]);
        return await prisma.enrollment.create({ data: convertedData });
    } catch (error) {
        console.log(error);
    }
};

const updateEnrollment = async (id, data) => {
    try {
        const convertedData = stringToInt(data, ["creatorId", "teacherId", "price", "newPrice"]);

        return await prisma.enrollment.update({
            where: { id: parseInt(id) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteEnrollment = async (id) => {
    return await prisma.enrollment.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
};
