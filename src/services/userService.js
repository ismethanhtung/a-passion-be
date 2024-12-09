const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
        },
    });
};

const createUser = async (data) => {
    return await prisma.user.create({ data });
};

const updateUser = async (id, data) => {
    const { password, ...rest } = data;
    const updatedData = { ...rest };

    if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
    }
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: updatedData,
    });
};

const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
