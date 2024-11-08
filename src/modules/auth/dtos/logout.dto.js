import Joi from 'joi';

const logoutSchema = Joi.object({
    token: Joi.string().required(),
});

const validateLogoutDTO = (data) => {
    const { error } = logoutSchema.validate(data);
    if (error) {
        return error.details[0].message;
    }
    return null;
};

module.exports = { validateLogoutDTO };
