const joi = require('joi');

const {EMAIL_REGEX, PASSWORD_REGEX} = require('../constants/regesp.enum');

const loginValidator = joi.object({
    email: joi
        .string()
        .regex(EMAIL_REGEX)
        .required(),
    password: joi
        .string()
        .regex(PASSWORD_REGEX)
        .required()
});

module.exports = {
    loginValidator
};
