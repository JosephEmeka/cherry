import Joi from 'joi';


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


const validateLoginDTO = (data) => {
    const { error } = loginSchema.validate(data);
    if (error) {
        return error.details[0].message;
    }
    return null;
};

module.exports = { validateLoginDTO };
