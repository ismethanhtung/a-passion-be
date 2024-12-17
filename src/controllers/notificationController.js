const notificationService = require("../services/notificationService");

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getLimitNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotificationById = async (req, res) => {
    const { id } = req.params;
    try {
        const notifications = await notificationService.getNotificationById(parseInt(id));
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNotification = async (req, res) => {
    try {
        const notification = await notificationService.createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await notificationService.updateNotification(parseInt(id), req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNotification = await notificationService.deleteNotification(parseInt(id));
        res.status(200).json(deletedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllNotifications,
    getLimitNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
};
