const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stringToInt = require("../utils/stringToInt");

const createConversation = async (senderId, receiverId) => {
    try {
        return await prisma.conversation.create({
            data: {
                participants: {
                    connect: [{ id: senderId }, { id: receiverId }],
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllConversationByUserId = async (id) => {
    try {
        return await prisma.conversation.findMany({
            where: {
                participants: {
                    some: { id: Number(userId) }, // Kiểm tra người dùng có trong danh sách tham gia cuộc trò chuyện không
                },
            },
            include: {
                participants: true, // Lấy danh sách người tham gia
                messages: {
                    take: 1, // Lấy tin nhắn gần nhất
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const sendMessage = async (senderId, receiverId, content) => {
    try {
        let conversation = await prisma.conversation.findFirst({
            where: {
                participants: {
                    every: {
                        id: { in: [senderId, receiverId] },
                    },
                },
            },
        });
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participants: {
                        connect: [{ id: senderId }, { id: receiverId }],
                    },
                },
            });
        }
        const message = await prisma.message.create({
            data: {
                content,
                senderId,
                receiverId,
                conversationId: conversation.id,
            },
        });
        io.to(receiverId.toString()).emit("new-message", message);

        return json(message);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createConversation,
    getAllConversationByUserId,
};
