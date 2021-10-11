const {login} = require('../validators/auth.validator');
const {findByEmail} = require('../services/userService');

module.exports = {
    validateUser: (req, res, next) => {
        try {
            const {error} = login.validate(req.body);

            if (error) {
                throw new Error('Error');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    ifEmailExist: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await findByEmail(email);

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
