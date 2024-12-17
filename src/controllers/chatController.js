const chatService = require("../services/chatService");

const createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const conversation = await chatService.createConversation(senderId, receiverId);
        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllConversationByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const conversations = await chatService.getAllConversationByUserId(parseInt(id));
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;

        const message = await chatService.sendMessage(senderId, receiverId, content);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createConversation,
    sendMessage,
    getAllConversationByUserId,
};
