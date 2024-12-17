const cartService = require("../services/cartService");

const getCartById = async (req, res) => {
    const { id } = req.params;
    try {
        const carts = await cartService.getCartById(parseInt(id));
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await cartService.updateCart(parseInt(id), req.body);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCart = await cartService.deleteCart(parseInt(id));
        res.status(200).json(deletedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};
