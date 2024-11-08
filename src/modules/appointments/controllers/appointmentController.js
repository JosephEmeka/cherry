import bookAppointmentDTO from '../dtos/bookAppointment.dto';
import cancelAppointmentDTO from '../dtos/cancelAppointment.dto';
import assignDoctorDTO from '../../doctors/dtos/assignDoctor.dto';
import * as appointmentService from '../services/appointmentService';

export const bookAppointment = async (req, res, next) => {
    try {
        const { error } = bookAppointmentDTO.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { doctorId, date, type } = req.body;
        const appointment = await appointmentService.bookAppointmentDTO(req.user.id, doctorId, date, type);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};

export const assignDoctor = async (req, res, next) => {
    try {
        const { error } = assignDoctorDTO.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { patientId, condition } = req.body;
        const appointment = await appointmentService.assignDoctor(patientId, condition);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};

export const getPatientAppointments = async (req, res, next) => {
    try {
        const appointments = await appointmentService.getPatientAppointments(req.user.id);
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

export const getDoctorAppointments = async (req, res, next) => {
    try {
        const appointments = await appointmentService.getDoctorAppointments(req.user.id);
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

export const cancelAppointment = async (req, res, next) => {
    try {
        const { error } = cancelAppointmentDTO.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { appointmentId } = req.body;
        const appointment = await appointmentService.cancelAppointment(appointmentId, req.user.id);
        res.status(200).json(appointment);
    } catch (error) {
        next(error);
    }
};

export const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};
