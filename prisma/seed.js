import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // const categoryListening = await prisma.category.create({
    //     data: {
    //         name: "Listening",
    //     },
    // });

    // const categoryReading = await prisma.category.create({
    //     data: {
    //         name: "Reading",
    //     },
    // });

    // const categorySpeaking = await prisma.category.create({
    //     data: {
    //         name: "Speaking",
    //     },
    // });

    // const categoryWriting = await prisma.category.create({
    //     data: {
    //         name: "Writing",
    //     },
    // });

    // const roles = ["admin", "teacher", "student"];
    // for (const role of roles) {
    //     await prisma.role.upsert({
    //         where: { name: role },
    //         update: {},
    //         create: { name: role },
    //     });
    // }

    // const teacherUsers = await Promise.all(
    //     Array.from({ length: 5 }).map((_, index) =>
    //         prisma.user.create({
    //             data: {
    //                 name: `Teacher ${index + 1}`,
    //                 email: `teacher${index + 1}@example.com`,
    //                 password: `teacherpassword${index + 1}`,
    //                 role: "TEACHER",
    //             },
    //         })
    //     )
    // );

    // const studentUsers = await Promise.all(
    //     Array.from({ length: 10 }).map((_, index) =>
    //         prisma.user.create({
    //             data: {
    //                 name: `Student ${index + 1}`,
    //                 email: `student${index + 1}@example.com`,
    //                 password: `studentpassword${index + 1}`,
    //                 role: "STUDENT",
    //             },
    //         })
    //     )
    // );

    // // 4. Đăng ký học cho sinh viên
    // await Promise.all(
    //     studentUsers.map((student, index) =>
    //         prisma.enrollment.create({
    //             data: {
    //                 userId: student.id,
    //                 courseId: courses[index % courses.length].id,
    //             },
    //         })
    //     )
    // );

    // // 5. Đánh giá khóa học
    // await Promise.all(
    //     studentUsers.map((student, index) =>
    //         prisma.review.create({
    //             data: {
    //                 userId: student.id,
    //                 courseId: courses[index % courses.length].id,
    //                 rating: Math.floor(Math.random() * 5) + 1,
    //                 comment: `Great course, learned a lot!`,
    //             },
    //         })
    //     )
    // );

    // // 6. Tạo bài kiểm tra
    // const tests = await Promise.all(
    //     Array.from({ length: 5 }).map((_, index) =>
    //         prisma.test.create({
    //             data: {
    //                 title: `Test ${index + 1}`,
    //                 description: `Test description for Test ${index + 1}`,
    //                 creatorId: teacherUsers[index % teacherUsers.length].id,
    //                 questions: {
    //                     create: Array.from({ length: 5 }).map(
    //                         (_, questionIndex) => ({
    //                             content: `Question ${
    //                                 questionIndex + 1
    //                             } for Test ${index + 1}`,
    //                             options: JSON.stringify([
    //                                 "Option 1",
    //                                 "Option 2",
    //                                 "Option 3",
    //                                 "Option 4",
    //                             ]),
    //                             answer: "Option 1",
    //                         })
    //                     ),
    //                 },
    //             },
    //         })
    //     )
    // );

    // // 7. Người dùng tham gia bài kiểm tra
    // await Promise.all(
    //     tests.map((test) =>
    //         prisma.test.update({
    //             where: { id: test.id },
    //             data: {
    //                 participants: {
    //                     connect: studentUsers.map((student) => ({
    //                         id: student.id,
    //                     })),
    //                 },
    //             },
    //         })
    //     )
    // );

    // // 8. Tạo bài viết (Blog)
    // const blogs = await Promise.all(
    //     Array.from({ length: 5 }).map((_, index) =>
    //         prisma.blog.create({
    //             data: {
    //                 title: `Blog Post ${index + 1}`,
    //                 content: `Content for blog post ${index + 1}`,
    //                 authorId: teacherUsers[index % teacherUsers.length].id,
    //                 published: true,
    //             },
    //         })
    //     )
    // );

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
