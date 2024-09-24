// src/associations/userAssociations.js

const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Define User associations
const defineUserAssociations = () => {
    User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
    User.hasMany(Appointment, { foreignKey: 'patientId', as: 'patientAppointments' });
};

module.exports = defineUserAssociations;
