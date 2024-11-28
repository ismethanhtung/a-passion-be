const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const tests = await prisma.test.findMany();
    res.json(tests);
});

router.post("/", async (req, res) => {
    const { title, description, creatorId } = req.body;
    console.log("Payload nhận được:", req.body); // Log dữ liệu nhận được

    try {
        const newTest = await prisma.test.create({
            data: {
                title,
                description,
                creator: { connect: { id: parseInt(creatorId) } }, // Kết nối tới User bằng ID
            },
        });
        res.status(201).json(newTest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo test." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTest = await prisma.test.update({
        where: { id: parseInt(id) },
        data: { title, description },
    });
    res.json(updatedTest);
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ đường dẫn
        const deletedTest = await prisma.test.delete({
            where: { id: parseInt(id) }, // Tìm người dùng cần xóa theo ID
        });
        res.json(deletedTest); // Trả về thông tin người dùng đã bị xóa
    } catch (error) {
        res.status(404).json({ error: "Test not found" }); // Nếu không tìm thấy người dùng
    }
});

module.exports = router;
