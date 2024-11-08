const Doctor = require('../models/Doctor');
const Appointment = require('../models/appointment');


const defineDoctorAssociations = () => {
    Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
    Doctor.hasMany(Appointment, { foreignKey: 'patientId', as: 'patientAppointments' });
};

module.exports = defineDoctorAssociations;
