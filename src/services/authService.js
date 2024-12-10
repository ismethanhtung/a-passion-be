const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken } = require("../utils/jwt");
const { hashPassword } = require("../utils/hash");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
    });

    if (!user) {
        const error = new Error("Email không tồn tại");
        error.status = 404;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Mật khẩu sai");
        error.status = 401;
        throw error;
    }
    console.log(user.role.name);

    const token = generateToken(user.id, user.role.name);

    return { user, token };
};

const signup = async (data) => {
    const { password, ...rest } = data;

    const hashedPassword = await hashPassword(password);

    const defaultRole = await prisma.role.findUnique({
        where: { name: "student" },
    });

    if (!defaultRole) {
        throw new Error("Role mặc định không tồn tại");
    }

    const newUser = await prisma.user.create({
        data: { ...rest, password: hashedPassword, roleId: defaultRole.id },
    });

    return newUser;
};

module.exports = {
    login,
    signup,
};
