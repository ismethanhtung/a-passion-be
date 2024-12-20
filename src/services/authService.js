const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken } = require("../utils/jwt");
const { hashPassword } = require("../utils/hash");
const bcrypt = require("bcrypt");
const { error } = require("winston");

const { v4: uuidv4 } = require("uuid");

const login = async (email, password) => {
    try {
        console.log(10000);
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });

        if (!user) {
            const error = new Error("Invalid Email");
            error.status = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error("Wrong Password");
            error.status = 401;
            throw error;
        }

        const accessToken = generateToken(user.id, user.role.name);
        const refreshToken = uuidv4();

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
            },
        });
        const expiresAt = 7 * 24 * 60 * 60 * 1000;

        return { user, accessToken, refreshToken, expiresAt };
    } catch (error) {
        console.log(error);
    }
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);

    if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token found" });
    }

    try {
        await prisma.refreshToken.delete({
            where: { token: refreshToken },
        });

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
    }
};

const refresh = async (refreshToken) => {
    try {
        const tokenRecord = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: {
                user: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        console.log(tokenRecord);

        if (!tokenRecord || new Date(tokenRecord.expiresAt) < new Date()) {
            throw new Error("Refresh token không hợp lệ hoặc đã hết hạn");
        }

        return generateToken(tokenRecord.user.id, tokenRecord.user.role.name);
    } catch (error) {
        console.error("Error refreshing token:", error.message);
        throw new Error("Unable to refresh token");
    }
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

const changePassword = async (currentPassword, newPassword, userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || !user.password) {
            throw new Error("User not found or password missing");
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error("Current password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        return await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    } catch (error) {
        console.error("Error changing password:", error.message);
        throw new Error("Unable to change password");
    }
};

module.exports = {
    login,
    signup,
    changePassword,
    refresh,
    logout,
};
