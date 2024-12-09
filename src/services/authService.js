const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { generateToken } from "../utils/jwt";

const login = async (data) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Mật khẩu sai",
        });
    }

    const token = generateToken(user.id);

    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
    });

    return res
        .status(200)
        .json({ message: "Đăng nhập thành công", token, user });
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
