

const User = require('../models/User');
const Appointment = require('../../appointments/models/appointment');
const LabTest = require('../models/labTest');


const defineUserAssociations = require('../../../core/associations/userAssociations');
const defineAppointmentAssociations = require('../../../core/associations/appointmentAssociations');


defineUserAssociations();
defineAppointmentAssociations();

module.exports = {
    User,
    appointment: Appointment,
    LabTest,
};
