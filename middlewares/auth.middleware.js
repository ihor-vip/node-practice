const passwordService = require('../services/password.service');
const User = require('../dataBase/User');
const {ErrorHandler, ErrorStatus, ErrorMessages} = require('../errors');

module.exports = {
    validateUser: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.EMAIL_OR_PASSWORD_IS_WRONG);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordsMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    }
};
