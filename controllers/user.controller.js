const User = require('../dataBase/User');
const { passwordService } = require('../services');
const { userNormalizator } = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();
            const usersNormalize = users.map((user) => userNormalizator(user));

            res.json(usersNormalize);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            let user = req.user;
            user = userNormalizator(user);

            res.json({user});
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashPassword = await passwordService.hash(req.body.password);

            await User.create({...req.body, password: hashPassword});

            res.end('User is added');
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body).lean();
            user = userNormalizator(user);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let deleteUser = await User.findByIdAndDelete(user_id).lean();
            deleteUser = userNormalizator(deleteUser);

            res.json(deleteUser);
        } catch (e) {
            res.json(e.message);
        }
    }

};
