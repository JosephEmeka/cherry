import Doctor from '../../modules/doctors/models/doctor';
import Appointment from '../../modules/appointments/models/appointment';

const defineDoctorAssociations = () => {
    Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
    Doctor.hasMany(Appointment, { foreignKey: 'patientId', as: 'patientAppointments' });
};

export default defineDoctorAssociations;
