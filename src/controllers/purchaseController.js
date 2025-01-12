const purchaseService = require("../services/purchaseService");

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await purchaseService.getAllPurchases();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitPurchases = async (req, res) => {
    try {
        const purchases = await purchaseService.getLimitPurchases();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPurchaseById = async (req, res) => {
    const { id } = req.params;
    try {
        const purchases = await purchaseService.getPurchaseById(parseInt(id));
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkPurchase = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.userId;
    console.log("courseid,", courseId);
    console.log("user", req.user);
    try {
        const purchases = await purchaseService.checkPurchase(parseInt(courseId), parseInt(userId));
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPurchase = async (req, res) => {
    try {
        const purchase = await purchaseService.createPurchase(req.body);
        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await purchaseService.updatePurchase(parseInt(id), req.body);
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPurchase = await purchaseService.deletePurchase(parseInt(id));
        res.status(200).json(deletedPurchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPurchases,
    getLimitPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
    checkPurchase,
};
