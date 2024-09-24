const appointmentService = require('../services/appointmentService');

exports.bookAppointment = async (req, res, next) => {
    try {
        const { doctorId, date, type } = req.body;
        const appointment = await appointmentService.bookAppointment(req.user.id, doctorId, date, type);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};
