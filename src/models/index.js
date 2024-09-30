

const User = require('./User');
const Appointment = require('./Appointment');
const LabTest = require('./LabTest');


const defineUserAssociations = require('../associations/userAssociations');
const defineAppointmentAssociations = require('../associations/appointmentAssociations');


defineUserAssociations();
defineAppointmentAssociations();

module.exports = {
    User,
    Appointment,
    LabTest,
};
