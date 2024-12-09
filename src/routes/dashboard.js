const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = require("../middlewares/authMiddleware");

app.get("/", authMiddleware, (req, res) => {
    const role = req.user.role;

    // Return data based on role
    if (role === "admin") {
        res.json({ message: "Welcome Admin", data: { usersCount: 100 } });
    } else if (role === "teacher") {
        res.json({ message: "Welcome Teacher", data: { courses: 10 } });
    } else if (role === "student") {
        res.json({ message: "Welcome Student", data: { progress: 75 } });
    } else {
        res.status(403).json({ message: "Access denied" });
    }
});

module.exports = router;
