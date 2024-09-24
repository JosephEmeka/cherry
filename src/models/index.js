// src/models/index.js

const User = require('./User');
const Appointment = require('./Appointment');
const LabTest = require('./LabTest');

// Import association definitions
const defineUserAssociations = require('../associations/userAssociations');
const defineAppointmentAssociations = require('../associations/appointmentAssociations');

// Define associations
defineUserAssociations();
defineAppointmentAssociations();

module.exports = {
    User,
    Appointment,
    LabTest,
};
