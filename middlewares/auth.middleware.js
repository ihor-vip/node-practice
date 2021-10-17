const {User} = require('../dataBase');

const {
    ErrorHandler,
    ErrorStatus: {BAD_REQUEST, NOT_FOUND},
    ErrorMessages: {BAD_DATA, WRONG_AUTH}
} = require('../errors');

const {userValidator: {loginValidator}} = require('../validators');

const authenticationMiddleware = {
    verifyUserLogin: (req, res, next) => {
        try {
            const {error} = loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    emailValidation: async (req, res, next) => {
        try {
            const {email} = req.body;
            const savedData = await User.findOne({email})
                .select('+password');

            if (!savedData) {
                throw new ErrorHandler(NOT_FOUND, WRONG_AUTH);
            }

            req.user = savedData;
            next();
        } catch (e) {
            next(e);
        }
    },
};

module.exports = authenticationMiddleware;
