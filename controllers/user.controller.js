const {User} = require('../dataBase');

const {
    ErrorStatus: {CREATED, ACCEPTED, NO_CONTENT},
    ErrorMessages: {USER_DELETED}
} = require('../errors');

const {userNormalizer} = require('../utils');

const {passwordService: {hash}} = require('../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.foundUser;
            const normalizedUser = userNormalizer(user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;

            const newPassword = await hash(password);

            const newUser = await User.create({
                ...req.body,
                password: newPassword
            });

            const normalizedUser = userNormalizer(newUser);

            res.status(CREATED)
                .json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body).lean();
            user = userNormalizer(user);

            res.status(ACCEPTED).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await User.deleteOne({id});

            res.status(NO_CONTENT)
                .json(USER_DELETED);
        } catch (error) {
            next(error);
        }
    }
};
