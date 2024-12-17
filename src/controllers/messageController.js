const messageService = require("../services/messageService");

const getAllMessages = async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitMessages = async (req, res) => {
    try {
        const messages = await messageService.getLimitMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessageById = async (req, res) => {
    const { id } = req.params;
    try {
        const messages = await messageService.getMessageById(parseInt(id));
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMessage = async (req, res) => {
    try {
        const message = await messageService.createMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await messageService.updateMessage(parseInt(id), req.body);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessage = await messageService.deleteMessage(parseInt(id));
        res.status(200).json(deletedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMessages,
    getLimitMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
};
