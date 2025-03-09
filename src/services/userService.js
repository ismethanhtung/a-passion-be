const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const getAllUsers = async () => {
    return await prisma.user.findMany({
        include: {
            role: true,
        },
    });
};

const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
            role: true,
            progress: {
                select: {
                    score: true,
                    status: true,
                },
            },
        },
    });
};

const createUser = async (data) => {
    return await prisma.user.create({ data });
};

const updateUser = async (userId, data) => {
    // const { id, name, email, ...rest } = data;
    // const updatedData = { name, email };

    // console.log(updatedData);

    // if (password) {
    //     updatedData.password = await bcrypt.hash(password, 10);
    // }
    const convertedData = stringToInt(data, ["knownVocabulary"]);

    try {
        return await prisma.user.update({
            where: { id: parseInt(userId) },
            data: convertedData,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (id) => {
    try {
        return await prisma.user.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
