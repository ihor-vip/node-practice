const Joi = require('joi');

const userRoles = require('../config/user.role.enum');
const {EMAIL_REGEX, PASSWORD_REGEX} = require('../constants/regesp.enum');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),

    email: Joi.string().regex(EMAIL_REGEX)
        .trim()
        .required(),

    password: Joi.string().regex(PASSWORD_REGEX)
        .required(),

    role: Joi.string().allow(...Object.values(userRoles))

});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(30)
        .trim(),

    email: Joi.string().trim()
});

module.exports = {createUserValidator, updateUserValidator};
