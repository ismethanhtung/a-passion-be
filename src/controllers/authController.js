const authService = require("../services/authService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Đăng nhập thành công",
            user,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Đã xảy ra lỗi trong quá trình đăng nhập",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ message: "Logout thành công" });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi logout" });
    }
};

const signup = async (req, res) => {
    try {
        const newUser = await authService.signup(req.body);
        res.status(201).json({
            message: "Tạo tài khoản thành công",
            user: newUser,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Đã xảy ra lỗi khi tạo tài khoản",
            error: error.message,
        });
    }
};

module.exports = { login, logout, signup };
