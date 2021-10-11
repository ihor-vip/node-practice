const {findUser, findUserById, findByEmail} = require('../services/userService');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');

module.exports = {
    isAllUserPresent: async (req, res, next) => {
        try {
            const user = await findUser().lean();

            if (!user) {
                throw new Error('No user');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await findUserById(user_id).lean();

            if (!user) {
                throw new Error('No user');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await findByEmail(email);

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const {error} = createUserValidator.validate(req.body);

            if (error) {
                throw new Error('Can not validate request');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    validateUserBodyToUpdate: (req, res, next) => {
        try {
            const {error} = updateUserValidator.validate(req.body);

            if (error) {
                throw new Error('Can not validate request');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
