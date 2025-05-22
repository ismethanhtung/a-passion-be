import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportData() {
    const backupDir = path.join(__dirname, "..", "db_backup");

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
    const backupFilePath = path.join(backupDir, `db_backup_${timestamp}.json`);

    // Danh sách các bảng để xuất
    const tables = [
        "user",
        "role",
        "refreshToken",
        "userSettings",
        "learningPath",
        "cart",
        "voucher",
        "forumThread",
        "forumPost",
        "forumComment",
        "conversation",
        "message",
        "notification",
        "payment",
        "category",
        "course",
        "lesson",
        "enrollment",
        "review",
        "progress",
        "purchase",
        "test",
        "question",
        "blog",
        "studyTime",
        "liveCourse",
        "liveSession",
        "assistantRequest",
        "assistantLog",
        "onlineTest",
        "testQuestion",
        "testAnswer",
        "testAttempt",
    ];

    console.log("Bắt đầu xuất dữ liệu...");

    const data: Record<string, any> = {};

    // Xuất dữ liệu từ mỗi bảng
    for (const table of tables) {
        try {
            // Lấy dữ liệu từ bảng (sử dụng Prisma dynamic API)
            // @ts-ignore
            const tableData = await prisma[table].findMany();
            data[table] = tableData;
            console.log(
                `Đã xuất dữ liệu từ bảng ${table}: ${tableData.length} bản ghi`
            );
        } catch (error: any) {
            console.log(
                `Lỗi khi xuất dữ liệu từ bảng ${table}: ${
                    error.message || "Lỗi không xác định"
                }`
            );
        }
    }

    // Ghi dữ liệu vào file
    fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2));

    console.log(`Xuất dữ liệu thành công! File: ${backupFilePath}`);
}

exportData()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
