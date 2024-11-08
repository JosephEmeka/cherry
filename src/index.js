

import User from './modules/users/models/user';
import Appointment from './modules/appointments/models/appointment';
import LabTest from './modules/users/models/labTest';


import defineUserAssociations from './core/associations/userAssociations';
import defineAppointmentAssociations from './core/associations/appointmentAssociations';


defineUserAssociations();
defineAppointmentAssociations();

export default {
    appointment: Appointment,
};
