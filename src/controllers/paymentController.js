const paymentService = require("../services/paymentService");

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitPayments = async (req, res) => {
    try {
        const payments = await paymentService.getLimitPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payments = await paymentService.getPaymentById(parseInt(id));
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await paymentService.updatePayment(parseInt(id), req.body);
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayment = await paymentService.deletePayment(parseInt(id));
        res.status(200).json(deletedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPayments,
    getLimitPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};
