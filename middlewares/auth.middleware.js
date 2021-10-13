const { authValidator } = require('../validators');
const { userService } = require('../services');

module.exports = {
    validateUser: (req, res, next) => {
        try {
            const {error} = authValidator.login.validate(req.body);

            if (error) {
                throw new Error('Errorhh');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findUserByEmail(email);

            if (!userByEmail) {
                throw new Error('Email already exist');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
