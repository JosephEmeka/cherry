import {Doctor} from '../../doctors/models/doctor.js';
import {Patient} from './../../users/models/patient.js';
import {Appointment} from '../../appointments/models/appointment.js'


const assignDoctor = async (patientId, condition) => {
    try {

        const existingAppointment = await Appointment.findOne({ where: { patientId } });
        if (existingAppointment) {
            throw new Error('Patient is already assigned to a doctor');
        }


        const availableDoctor = await Doctor.findOne({ where: { specialty: condition, available: true } });
        if (!availableDoctor) {
            throw new Error('No available doctors with the specified specialty');
        }


        const newAppointment = await Appointment.create({ patientId, doctorId: availableDoctor.id });


        availableDoctor.available = false;
        await availableDoctor.save();

        return newAppointment;
    } catch (error) {
        throw new Error(`Error in assigning doctor: ${error.message}`);
    }
};


const cancelAssignment = async (appointmentId) => {
    try {
        const existingAppointment = await Appointment.findByPk(appointmentId);
        if (!existingAppointment) throw new Error('Appointment not found');


        const assignedDoctor = await Doctor.findByPk(existingAppointment.doctorId);
        if (!assignedDoctor) throw new Error('Doctor not found');


        assignedDoctor.available = true;
        await assignedDoctor.save();


        await existingAppointment.destroy();

        return { message: 'Assignment cancelled successfully' };
    } catch (error) {
        throw new Error(`Error in cancelling assignment: ${error.message}`);
    }
};


const checkAllAssignments = async () => {
    try {
        return await Appointment.findAll({
            include: [
                {model: Doctor, attributes: ['name', 'specialty']},
                {model: Patient, attributes: ['name']}
            ]
        });
    } catch (error) {
        throw new Error(`Error in retrieving assignments: ${error.message}`);
    }
};


const checkAllAssignees = async () => {
    try {
        return await Doctor.findAll({
            where: {available: false},
            attributes: ['id', 'name', 'specialty']
        });
    } catch (error) {
        throw new Error(`Error in retrieving assignees: ${error.message}`);
    }
};


export {
    assignDoctor,
    cancelAssignment,
    checkAllAssignments,
    checkAllAssignees
};
