const { Doctor: doctor, appointment, Patient: patient } = require('../models');


const assignDoctor = async (patientId, condition) => {
    try {

        const existingAppointment = await appointment.findOne({ where: { patientId } });
        if (existingAppointment) {
            throw new Error('Patient is already assigned to a doctor');
        }


        const doctor = await doctor.findOne({ where: { specialty: condition, available: true } });
        if (!doctor) throw new Error('No available doctors');


        const appointment = await appointment.create({ patientId, doctorId: doctor.id });


        doctor.available = false;
        await doctor.save();

        return appointment;
    } catch (error) {
        throw new Error('Error in assigning doctor: ' + error.message);
    }
};



const cancelAssignment = async (appointmentId) => {
    try {
        const appointment = await appointment.findByPk(appointmentId);
        if (!appointment) throw new Error('Appointment not found');

        const doctor = await doctor.findByPk(appointment.doctorId);
        if (!doctor) throw new Error('Doctor not found');


        doctor.available = true;
        await doctor.save();


        await appointment.destroy();

        return { message: 'Assignment cancelled successfully' };
    } catch (error) {
        throw new Error('Error in cancelling assignment: ' + error.message);
    }
};


const checkAllAssignments = async () => {
    try {
        const assignments = await appointment.findAll({
            include: [
                { model: doctor, attributes: ['name', 'specialty'] },
                { model: patient, attributes: ['name'] }
            ]
        });

        return assignments;
    } catch (error) {
        throw new Error('Error in retrieving assignments: ' + error.message);
    }
};


const checkAllAssignees = async () => {
    try {
        const assignedDoctors = await doctor.findAll({
            where: { available: false },
            attributes: ['id', 'name', 'specialty']
        });

        return assignedDoctors;
    } catch (error) {
        throw new Error('Error in retrieving assignees: ' + error.message);
    }
};

module.exports = {
    cancelAssignment,
    checkAllAssignments,
    checkAllAssignees,
};

module.exports = { assignDoctor };



