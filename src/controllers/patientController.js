const patientService = require('../services/patientService');

exports.getMedicalHistory = async (req, res, next) => {
    try {
        const history = await patientService.getMedicalHistory(req.user.id);
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
};

exports.bookAppointment = async (req, res, next) => {
    try {
        const { doctorId, date, type } = req.body;
        const appointment = await patientService.bookAppointment(req.user.id, doctorId, date, type);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};
