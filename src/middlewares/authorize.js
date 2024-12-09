const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user || !roles.includes(user.role)) {
                return res
                    .status(403)
                    .json({ message: "Không có quyền truy cập" });
            }
            next();
        } catch (error) {
            console.error("Error in authorize middleware:", error);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
    };
};

module.exports = authorize;
