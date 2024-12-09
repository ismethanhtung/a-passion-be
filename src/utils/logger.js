const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Định dạng log
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// Tạo logger
const logger = createLogger({
    level: "info", // Mức độ ghi log, ví dụ: info, warn, error
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        colorize(), // Màu sắc cho log (chỉ áp dụng với console)
        logFormat
    ),
    transports: [
        new transports.Console(), // Hiển thị log trên console
        new transports.File({ filename: "logs/error.log", level: "error" }), // Ghi lỗi vào tệp error.log
        new transports.File({ filename: "logs/app.log" }), // Ghi toàn bộ log vào app.log
    ],
});

module.exports = logger;
