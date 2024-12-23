const authService = require("../services/authService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken, expiresAt } = await authService.login(
            email,
            password
        );

        res.status(200).json({
            message: "Đăng nhập thành công",
            user,
            accessToken,
            refreshToken,
            expiresAt,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Đã xảy ra lỗi trong quá trình đăng nhập",
        });
    }
};

const loginWithGoogle = async (req, res) => {
    const { email, name, image, accessToken } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    roleId: 1,
                    password: "", // Không cần mật khẩu, vì đăng nhập qua Google
                    isDeleted: false,
                },
            });
        }

        // // Tạo refresh token (nếu cần)
        // const refreshTokenData = await prisma.refreshToken.create({
        //     data: {
        //         token: refreshToken, // Refresh token từ Google
        //         userId: user.id,
        //         expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // Ví dụ 30 ngày hết hạn
        //     },
        // });

        // Trả về thông tin người dùng và token
        return res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role.name, // Nếu có role
            },
            accessToken, // Access token từ Google
            // refreshToken: refreshTokenData.token, // Refresh token mới tạo
        });
    } catch (error) {
        console.error("Error during Google login:", error);
        return res.status(500).json({ message: "Đăng nhập không thành công" });
    }
};

const logout = async (req, res) => {
    try {
        await authService.logout(req, res);
    } catch (error) {
        console.log(error);
    }
};

const verifyEmail = async (req, res) => {
    try {
        await authService.verifyEmail(req, res);
    } catch (error) {
        console.log(error);
    }
};

const signup = async (req, res) => {
    try {
        const newUser = await authService.signup(req.body);
        res.status(201).json({
            message: "Tạo tài khoản thành công, vui lòng xác nhận email",
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

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId;
        await authService.changePassword(currentPassword, newPassword, userId);
        res.status(200).json({
            message: "Đổi mật khẩu thành công",
        });
    } catch (error) {
        console.log(error);
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: "Thiếu refresh token" });
        }

        const accessToken = await authService.refresh(refreshToken);

        res.status(200).json({
            message: "Cấp lại access token thành công",
            accessToken,
        });
    } catch (error) {
        res.status(401).json({
            message: error.message || "Refresh token không hợp lệ hoặc đã hết hạn",
        });
    }
};

module.exports = { login, logout, signup, changePassword, refresh, loginWithGoogle, verifyEmail };
