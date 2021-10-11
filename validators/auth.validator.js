const Joi = require('joi');

const {PASSWORD_REGEX, EMAIL_REGEX} = require('../constants/regesp.enum');

const login = Joi.object({
    password: Joi.string().regex(PASSWORD_REGEX)
        .trim()
        .required(),

    email: Joi.string().regex(EMAIL_REGEX)
        .trim()
        .required(),
});

module.exports = {login};
