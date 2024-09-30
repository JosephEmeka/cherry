


export async function bookAppointment(id, doctorId, date, type) {

}

const { Doctor } = require('../models/doctor');
const { Appointment } = require('../models/appointment');


async function assignDoctor(patientId, condition) {
    const doctor = await Doctor.findOne( {
        where: { specialty: condition, available: true }
    });

    if (!doctor) {
        throw new Error('No available doctors');
    }

    doctor.available = false;
    await doctor.save();

    return await Appointment.create({
        patientId,
        doctorId: doctor.id
    });
}

module.exports = { assignDoctor };
