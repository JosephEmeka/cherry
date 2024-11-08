import { bookAppointmentDTO } from '../dtos/bookAppointment.dto';
import Doctor from '../../doctors/models/doctor';
import Appointment from '../models/appointment';
import Patient from '../../users/models/patient';
import viewAppointmentDTO from '../dtos/viewAppointment.dto';

const PATIENTS_PER_DAY = 6;


export async function assignDoctor(patientId, condition, appointmentDate) {
    const availableDoctors = await Doctor.findAll({
        include: [
            {
                model: Appointment,
                required: false,
                where: {
                    appointmentDate,
                    status: 'scheduled',
                },
            },
        ],
    });

    let assignedDoctor = null;
    let availableTimeSlot = null;

    for (const doctor of availableDoctors) {
        const appointments = doctor.Appointment || [];

        if (appointments.length < PATIENTS_PER_DAY) {
            const availableTimes = getAvailableTimeSlots(appointments);
            if (availableTimes.length > 0) {
                assignedDoctor = doctor;
                availableTimeSlot = availableTimes[0];
                break;
            }
        }
    }

    if (!assignedDoctor) {
        throw new Error('No available doctors or time slots on this day.');
    }

    const appointment = await Appointment.create({
        patientId,
        doctorId: assignedDoctor.id,
        appointmentDate,
        startTime: availableTimeSlot,
    });

    return new bookAppointmentDTO(
        patientId,
        assignedDoctor.id,
        appointmentDate,
        availableTimeSlot,
        condition
    );
}

export async function viewPatientAppointments(patientId) {
    const appointments = await Appointment.findAll({
        where: { patientId },
        include: [{ model: Doctor }],
        order: [['appointmentDate', 'ASC'], ['startTime', 'ASC']],
    });

    return appointments.map(appointment => new viewAppointmentDTO(
        appointment.id,
        appointment.Doctor.name,
        appointment.Patient.name,
        appointment.appointmentDate,
        appointment.startTime,
        appointment.status
    ));
}

export async function viewDoctorAppointments(doctorId) {
    const appointments = await Appointment.findAll({
        where: { doctorId },
        include: [{ model: Patient }],
        order: [['appointmentDate', 'ASC'], ['startTime', 'ASC']],
    });

    return appointments.map(appointment => new viewAppointmentDTO(
        appointment.id,
        appointment.Doctor.name,
        appointment.Patient.name,
        appointment.appointmentDate,
        appointment.startTime,
        appointment.status
    ));
}

function getAvailableTimeSlots(appointments) {
    const scheduledTimes = appointments.map(appt => appt.startTime);
    const availableTimes = [];

    for (let hour = 9; hour <= 16; hour++) {
        const timeSlot = `${hour}:00`;
        if (!scheduledTimes.includes(timeSlot)) {
            availableTimes.push(timeSlot);
        }
    }

    return availableTimes;
}
