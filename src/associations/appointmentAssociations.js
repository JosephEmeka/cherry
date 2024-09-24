// src/associations/appointmentAssociations.js

const Appointment = require('../models/Appointment');
const LabTest = require('../models/LabTest');

// Define Appointment associations
const defineAppointmentAssociations = () => {
    Appointment.hasMany(LabTest, { foreignKey: 'appointmentId', as: 'labTests' });
};

module.exports = defineAppointmentAssociations;
