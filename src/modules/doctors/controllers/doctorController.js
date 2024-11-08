const doctorService = require('../../../services/doctorService');
const {findAll} = require("../../../models/User");

const getAppointments = async (req, res, next) => {
    try {
        const appointments = await doctorService.getAppointments(req.user.id);
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};
const viewPatients = async (req, res) => {
    try {
        const patients = await findAll({ where: { assignedDoctor: req.user.id } });
        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
};

module.exports = { viewPatients, getAppointments };