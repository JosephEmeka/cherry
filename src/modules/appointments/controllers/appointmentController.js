const appointmentService = require('../services/appointmentService');
const { assignDoctor } = require('../services/appointmentService');

exports.bookAppointment = async (req, res, next) => {
    try {
        const { doctorId, date, type } = req.body;
        const appointment = await appointmentService.bookAppointment(req.user.id, doctorId, date, type);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }




    async function createAppointment(req, res) {
        const { patientId, condition } = req.body;

        try {
            const appointment = await assignDoctor(patientId, condition);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    module.exports = { createAppointment };
};
