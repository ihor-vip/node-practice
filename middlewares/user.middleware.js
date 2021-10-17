const {User} = require('../dataBase');

const {
    ErrorHandler,
    ErrorMessages: {BAD_DATA, WRONG_AUTH},
    ErrorStatus: {BAD_REQUEST, CONFLICT}
} = require('../errors');

const {
    userValidator: {
        createUserValidator,
        updateUserValidator
    }
} = require('../validators');

module.exports = {

    emailValidation: async (req, res, next) => {
        try {
            const {email} = req.body;
            const emailSaved = await User.findOne({email});

            if (emailSaved) {
                throw new ErrorHandler(WRONG_AUTH, CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDataForCreateUser: (req, res, next) => {
        try {
            const {error} = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDataForUpdateUser: (req, res, next) => {
        try {
            const {error} = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const foundUser = await User.findOne({[dbFiled]: value});

            if (!foundUser) {
                throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
            }

            req.foundUser = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    }

};
