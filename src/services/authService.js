const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken } = require("../utils/jwt");
const { hashPassword } = require("../utils/hash");
const bcrypt = require("bcrypt");
const { error } = require("winston");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const { v4: uuidv4 } = require("uuid");

const login = async (email, password) => {
    try {
        console.log("login");
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });

        if (!user) {
            const error = new Error("Invalid Email");
            error.status = 404;
            throw error;
        }

        if (!user.active) {
            const error = new Error("Please Verify Email");
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

const loginWithGoogle = async (email, name, googleId) => {
    try {
        console.log(123471293847);
        const defaultRole = await prisma.role.findUnique({
            where: { name: "student" },
        });
        const hashedPassword = await hashPassword(googleId);

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword,
                    roleId: defaultRole.id,
                    active: true,
                    emailCheckToken: "",
                },
            });
        }
        const response = await login(email, googleId);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const loginWithFacebook = async (name, id, userID) => {
    try {
        console.log("login fb");
        console.log(name, id, userID);

        const defaultRole = await prisma.role.findUnique({
            where: { name: "student" },
        });
        const hashedPassword = await hashPassword(userID);

        const user = await prisma.user.findUnique({
            where: { email: id },
        });

        if (!user) {
            await prisma.user.create({
                data: {
                    email: id,
                    name: name,
                    password: hashedPassword,
                    roleId: defaultRole.id,
                    active: true,
                    emailCheckToken: "",
                },
            });
        }
        const response = await login(id, userID);
        return response;
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
    const { email, password, ...rest } = data;

    const hashedPassword = await hashPassword(password);

    const defaultRole = await prisma.role.findUnique({
        where: { name: "student" },
    });

    if (!defaultRole) {
        throw new Error("Role mặc định không tồn tại");
    }
    const emailCheckToken = crypto.randomBytes(64).toString("hex");

    const newUser = await prisma.user.create({
        data: {
            ...rest,
            email: email,
            password: hashedPassword,
            roleId: defaultRole.id,
            active: false,
            emailCheckToken,
        },
    });

    const verificationLink = `http://localhost:5000/verify-email?token=${emailCheckToken}&email=${encodeURIComponent(
        email
    )}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #4CAF50; text-align: center;">Verify Your Email</h2>
                <p>Dear <strong>${email}</strong>,</p>
                <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${verificationLink}" 
                        style="display: inline-block; text-decoration: none; font-size: 16px; color: white; background-color: #4CAF50; padding: 10px 20px; border-radius: 5px; border: 1px solid #3E8E41;">
                        Verify Email
                    </a>
                </div>
                <p>If the button above doesn't work, you can also verify your email by clicking this link:</p>
                <p><a href="${verificationLink}" style="color: #4CAF50;">${verificationLink}</a></p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 12px; color: #666;">If you did not sign up for this account, please ignore this email or contact support if you have questions.</p>
                <p style="font-size: 12px; color: #666; text-align: center;">&copy; ${new Date().getFullYear()} LinguaX. All rights reserved.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (err) {
        console.error(err.stack || err.message || err);

        console.error("Error sending email:", err.message);
    }

    return newUser;
};

const verifyEmail = async (req, res) => {
    const { email, token } = req.query;
    console.log(email, token);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user || user.emailCheckToken != token) {
        return res.status(400).json({ error: "Invalid token" });
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            active: true,
            emailCheckToken: "",
        },
    });

    res.redirect(process.env.CLIENT_URL);
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
    verifyEmail,
    loginWithGoogle,
    loginWithFacebook,
};
