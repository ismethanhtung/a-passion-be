const testService = require("../services/testService");

const getAllTests = async (req, res) => {
    try {
        const tests = await testService.getAllTests();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitTests = async (req, res) => {
    try {
        const tests = await testService.getLimitTests();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTestById = async (req, res) => {
    const { id } = req.params;
    try {
        const tests = await testService.getTestById(parseInt(id));
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTest = async (req, res) => {
    try {
        const test = await testService.createTest(req.body);
        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTest = async (req, res) => {
    const { id } = req.params;
    try {
        const test = await testService.updateTest(parseInt(id), req.body);
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTest = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTest = await testService.deleteTest(parseInt(id));
        res.status(200).json(deletedTest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTests,
    getLimitTests,
    getTestById,
    createTest,
    updateTest,
    deleteTest,
};
