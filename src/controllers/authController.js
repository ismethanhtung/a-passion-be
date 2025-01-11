const authService = require("../services/authService");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("process.env.GOOGLE_CLIENT_ID");

async function verifyGoogleToken(credential) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        console.error("Lỗi xác thực Google:", error);
        throw new Error("Xác thực Google thất bại");
    }
}

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
    const { credential } = req.body;
    const payload = await verifyGoogleToken(credential);
    const { email, name, sub: googleId } = payload;
    if (!email || !name || !googleId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await authService.loginWithGoogle(email, name, googleId);

        res.status(200).json({
            message: "Đăng nhập thành công",
            response,
        });
    } catch (error) {
        console.log(error);
    }
};

const loginWithFacebook = async (req, res) => {
    const { name, id, userID } = req.body.accessToken;
    console.log(req.body);

    try {
        const response = await authService.loginWithFacebook(name, id, userID);

        res.status(200).json({
            message: "Đăng nhập thành công",
            response,
        });
    } catch (error) {
        console.log(error);
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

module.exports = {
    login,
    logout,
    signup,
    changePassword,
    refresh,
    loginWithGoogle,
    loginWithFacebook,
    verifyEmail,
};
