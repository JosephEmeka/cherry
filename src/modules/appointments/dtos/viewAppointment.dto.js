import Joi from "joi";
const viewAppointmentDto = Joi.object({
    patientId: Joi.string().uuid().required(),
});

export default viewAppointmentDto