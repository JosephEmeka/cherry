import Appointment from '../../modules/appointments/models/appointment';
import LabTest from '../../modules/users/models/labTest';

const defineAppointmentAssociations = () => {
    Appointment.hasMany(LabTest, { foreignKey: 'appointmentId', as: 'labTests' });
};

export default defineAppointmentAssociations;
