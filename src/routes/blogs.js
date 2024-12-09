const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const blogs = await prisma.blog.findMany();

    res.json(blogs);
});

router.post("/", async (req, res) => {
    const { title, content, authorId } = req.body;
    console.log(req.body);

    try {
        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                author: { connect: { id: parseInt(authorId) } },
            },
        });
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedBlog = await prisma.blog.update({
        where: { id: parseInt(id) },
        data: { title, content },
    });
    res.json(updatedBlog);
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ đường dẫn
        const deletedBlog = await prisma.blog.delete({
            where: { id: parseInt(id) }, // Tìm người dùng cần xóa theo ID
        });
        res.json(deletedBlog); // Trả về thông tin người dùng đã bị xóa
    } catch (error) {
        res.status(404).json({ error: "Blog not found" }); // Nếu không tìm thấy người dùng
    }
});

module.exports = router;
