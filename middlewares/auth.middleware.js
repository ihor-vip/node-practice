const User = require('../dataBase/User');
const {compare} = require('../services/password.service');
const {authValidator} = require('../validators');
const {ErrorHandler, ErrorStatus, ErrorMessages} = require('../errors');

module.exports = {
    isLoginValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.NO_CONTENT_MESSAGE);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    loginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userExist = await User.findOne({email}).select('+password');

            if (!userExist) {
                throw new ErrorHandler(ErrorStatus.CONFLICT, ErrorMessages.NO_CONTENT_MESSAGE);
            }

            await compare(password, userExist.password);

            req.user = userExist;

            next();
        } catch (e) {
            next(e);
        }
    }
};
