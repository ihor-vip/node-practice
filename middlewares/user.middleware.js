const { userService } = require('../services');
const { userValidator } = require('../validators');

module.exports = {
    isUsersExist: async (req, res, next) => {
        try {
            const user = await userService.findUser().lean();

            if (!user) {
                throw new Error('No users');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isOneUserExist: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await userService.findUserById(user_id).lean();

            if (!user) {
                throw new Error('No user');
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
                throw new Error('Email already exist');
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
                throw new Error('Can not validate request');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    validateUserToUpdate: (req, res, next) => {
        try {
            const {error} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error('Can not validate request');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
