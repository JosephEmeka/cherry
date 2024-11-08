import Joi from "joi";

const bookAppointmentDTO = Joi.object({
    patientId: Joi.string().uuid().required(),
    doctorId: Joi.string().uuid().required(),
    appointmentDate: Joi.date().required(),
    startTime: Joi.string().pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/).required(),
    condition: Joi.string().required(),
});

export default bookAppointmentDTO


