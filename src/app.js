var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const testsRouter = require("./routes/tests");
const blogsRouter = require("./routes/blogs");
const coursesRouter = require("./routes/courses");
const questionsRouter = require("./routes/questions");
const lessonsRouter = require("./routes/lessons");
const enrollmentRouter = require("./routes/enrollment");
const purchaseRouter = require("./routes/purchase");
const reviewsRoutes = require("./routes/reviews");
const categoriesRoutes = require("./routes/categories");
const loginRouter = require("./routes/auth/login");
const signUpRouter = require("./routes/auth/signup");
const logoutRouter = require("./routes/auth/logout");

const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const logger = require("./utils/logger");

var app = express();
const port = 5000;

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).send("Internal Server Error");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tests", testsRouter);
app.use("/blogs", blogsRouter);
app.use("/courses", coursesRouter);
app.use("/questions", questionsRouter);
app.use("/lessons", lessonsRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/purchase", purchaseRouter);
app.use("/reviews", reviewsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use("/api/course", courseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/category", categoryRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
