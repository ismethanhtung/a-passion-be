const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Lấy danh sách người dùng
router.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Thêm người dùng mới
router.post("/", async (req, res) => {
    const { name, email } = req.body;
    // console.log("Payload nhận được:", req.body); // Log dữ liệu nhận được

    try {
        // Nếu không có người dùng với email trùng, tạo người dùng mới
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo người dùng." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email },
    });
    res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ đường dẫn
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) }, // Tìm người dùng cần xóa theo ID
        });
        res.json(deletedUser); // Trả về thông tin người dùng đã bị xóa
    } catch (error) {
        res.status(404).json({ error: "User not found" }); // Nếu không tìm thấy người dùng
    }
});

module.exports = router;
