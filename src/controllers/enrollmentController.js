const enrollmentService = require("../services/enrollmentService");

const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await enrollmentService.getAllEnrollments();
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimitEnrollments = async (req, res) => {
    try {
        const enrollments = await enrollmentService.getLimitEnrollments();
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEnrollmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollments = await enrollmentService.getEnrollmentById(parseInt(id));
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEnrollment = async (req, res) => {
    try {
        const enrollment = await enrollmentService.createEnrollment(req.body);
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await enrollmentService.updateEnrollment(parseInt(id), req.body);
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEnrollment = await enrollmentService.deleteEnrollment(parseInt(id));
        res.status(200).json(deletedEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEnrollments,
    getLimitEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
};
