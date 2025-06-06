const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morganLogger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Middleware

app.use(morganLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
    cors({
        origin: ["http://localhost:3000", "https://codealone.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
);
app.set("trust proxy", 1);

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
app.use("/verify-email", authRoutes);
app.use("/change-password", authRoutes);
app.use("/facebook-login", authRoutes);
app.use("/google-login", authRoutes);
app.use("/signup", authRoutes);
app.use("/logout", authRoutes);
app.use("/login", authRoutes);
app.use("/auth", authRoutes);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API Documentation",
        },
        servers: [
            {
                url: "https://a-passion-be-production.up.railway.app",
            },
        ],
    },
    apis: ["src/routes/*.js"],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Xử lý lỗi 404
// app.use((req, res, next) => {
//     next(createError(404));
// });
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});
app.use("/", authRoutes);

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    appLogger.error(`Error: ${err.message}`);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).render("error");
});

module.exports = app;
