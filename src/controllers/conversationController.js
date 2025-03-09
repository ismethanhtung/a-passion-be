const conversationService = require("../services/conversationService");

const getAllConversations = async (req, res) => {
    try {
        const conversations = await conversationService.getAllConversations();
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConversationByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const conversations = await conversationService.getConversationByUserId(parseInt(id));
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createConversation = async (req, res) => {
    try {
        const conversation = await conversationService.createConversation(req);
        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateConversation = async (req, res) => {
    const { id } = req.params;
    try {
        const conversation = await conversationService.updateConversation(parseInt(id), req.body);
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteConversation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedConversation = await conversationService.deleteConversation(parseInt(id));
        res.status(200).json(deletedConversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllConversations,
    getConversationByUserId,
    createConversation,
    updateConversation,
    deleteConversation,
};
