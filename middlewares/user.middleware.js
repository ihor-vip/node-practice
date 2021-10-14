const User = require('../dataBase/User');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');
const {ErrorHandler, ErrorStatus, ErrorMessages} = require('../errors');

module.exports = {
    isOneUserExist: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.NO_CONTENT_MESSAGE);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.EMAIL_IS_ALREADY_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUser: (req, res, next) => {
        try {
            const {error} = createUserValidator.validate(req.body);

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
            const {error} = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.ENTITY_NOT_FOUND);
            }

            next();
        } catch (e) {
            next();
        }
    }
};
