const { Doctor, Appointment } = require('../models');



const assignDoctor = async (patientId, condition) => {
    try {
        const doctor = await Doctor.findOne({ where: { specialty: condition, available: true } });
        if (!doctor) throw new Error('No available doctors');
        const appointment = await Appointment.create({ patientId, doctorId: doctor.id });
        doctor.available = false; // Mark the doctor as unavailable after assigning
        await doctor.save();
        return appointment;
    } catch (error) {
        throw new Error('Error in assigning doctor: ' + error.message);
    }
};

module.exports = { assignDoctor };

