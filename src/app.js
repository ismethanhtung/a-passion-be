const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morganLogger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const appLogger = require("./utils/logger");
const indexRouter = require("./routes/index");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const forumThreadRoutes = require("./routes/forumThreadRoutes");
const forumPostRoutes = require("./routes/forumPostRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const progressRoutes = require("./routes/progressRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const testRoutes = require("./routes/testRoutes");
const questionRoutes = require("./routes/questionRoutes");
const studyTimeRoutes = require("./routes/studyTimeRoutes");
const liveCourseRoutes = require("./routes/liveCourseRoutes");
const liveSessionRoutes = require("./routes/liveSessionRoutes");
const cartRoutes = require("./routes/cartRoutes");
const pathRoutes = require("./routes/pathRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
app.use(
    cors({
        origin: ["http://localhost:3000", "https://codealone.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Thêm OPTIONS để tránh lỗi preflight
        allowedHeaders: ["Content-Type", "Authorization"], // Cho phép các header cần thiết
    })
);

app.use(morganLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Định tuyến
app.use("/course", courseRoutes);
app.use("/user", userRoutes);
app.use("/lesson", lessonRoutes);
app.use("/review", reviewRoutes);
app.use("/forumThread", forumThreadRoutes);
app.use("/forumPost", forumPostRoutes);
app.use("/message", messageRoutes);
app.use("/notification", notificationRoutes);
app.use("/payment", paymentRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/progress", progressRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/test", testRoutes);
app.use("/question", questionRoutes);
app.use("/blog", blogRoutes);
app.use("/studyTime", studyTimeRoutes);
app.use("/liveCourse", liveCourseRoutes);
app.use("/liveSession", liveSessionRoutes);
app.use("/category", categoryRoutes);
app.use("/chat", chatRoutes);
app.use("/cart", cartRoutes);
app.use("/path", pathRoutes);
app.use("/conversation", conversationRoutes);
app.use("/", authRoutes);
app.use("/", indexRouter);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Xử lý lỗi 404
// app.use((req, res, next) => {
//     next(createError(404));
// });

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    appLogger.error(`Error: ${err.message}`);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).render("error");
});

module.exports = app;
