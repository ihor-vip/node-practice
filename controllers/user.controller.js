const User = require('../dataBase/User');
const {hash} = require('../services/password.service');
const {userNormalizator} = require('../util/user.util');
const {CREATED, NO_CONTENT} = require('../errors/Error.status');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find().lean();
            const usersNormalize = users.map((user) => userNormalizator(user));

            res.json(usersNormalize);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            let user = req.user;
            user = userNormalizator(user);

            res.json({user});
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashPassword});

            const user = userNormalizator(newUser);
            res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body).lean();
            user = userNormalizator(user);

            res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let deleteUser = await User.findByIdAndDelete(user_id).lean();
            deleteUser = userNormalizator(deleteUser);

            res.status(NO_CONTENT).json(deleteUser);
        } catch (e) {
            next(e);
        }
    }

};
