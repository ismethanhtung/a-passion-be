const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllPaths = async () => {
    return await prisma.path.findMany({
        include: {
            role: true,
        },
    });
};

const getPathById = async (id) => {
    try {
        return await prisma.learningPath.findMany({
            where: { userId: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

const createPath = async (data) => {
    return await prisma.path.create({ data });
};

const updatePath = async (pathId, data) => {
    // const { id, name, email, ...rest } = data;
    // const updatedData = { name, email };

    // console.log(updatedData);

    // if (password) {
    //     updatedData.password = await bcrypt.hash(password, 10);
    // }
    const convertedData = stringToInt(data, ["knownVocabulary"]);

    try {
        return await prisma.path.update({
            where: { id: parseInt(pathId) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deletePath = async (id) => {
    try {
        return await prisma.path.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllPaths,
    getPathById,
    createPath,
    updatePath,
    deletePath,
};
