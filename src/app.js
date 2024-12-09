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

var app = express();
const port = 5000;

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

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
