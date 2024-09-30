

const Appointment = require('../models/appointment');
const LabTest = require('../models/labTest');

const defineAppointmentAssociations = () => {
    Appointment.hasMany(LabTest, { foreignKey: 'appointmentId', as: 'labTests' });
};

module.exports = defineAppointmentAssociations;
