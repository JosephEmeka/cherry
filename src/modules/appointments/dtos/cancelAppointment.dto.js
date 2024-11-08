import Joi from "joi";
const cancelAppointmentDTO = Joi.object({
    appointmentId: Joi.string().uuid().required(),
});

export default cancelAppointmentDTO