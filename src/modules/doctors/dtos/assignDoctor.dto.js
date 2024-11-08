import Joi from "joi";

const assignDoctorDTO = Joi.object({
    patientId: Joi.string().uuid().required(),
    condition: Joi.string().required(),
});

export default assignDoctorDTO