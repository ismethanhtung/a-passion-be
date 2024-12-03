var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testsRouter = require("./routes/tests");
var blogsRouter = require("./routes/blogs");
var coursesRouter = require("./routes/courses");
var questionsRouter = require("./routes/questions");
var lessonsRouter = require("./routes/lessons");
var authRouter = require("./routes/auth");

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
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
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
