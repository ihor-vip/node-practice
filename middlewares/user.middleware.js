const {userService} = require('../services');
const {userValidator} = require('../validators');
const {ErrorHandler, ErrorStatus, ErrorMessages} = require('../errors');

module.exports = {
    isUsersExist: async (req, res, next) => {
        try {
            const user = await userService.findUser().lean();

            if (!user) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.NO_CONTENT_MESSAGE);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isOneUserExist: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await userService.findUserById(user_id).lean();

            if (!user) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.NO_CONTENT_MESSAGE);
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findUserByEmail(email);

            if (userByEmail) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.EMAIL_IS_ALREADY_EXIST);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    validateUser: (req, res, next) => {
        try {
            const {error} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.ENTITY_NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserToUpdate: (req, res, next) => {
        try {
            const {error} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.ENTITY_NOT_FOUND);
            }

            next();
        } catch (e) {
            next();
        }
    }
};
