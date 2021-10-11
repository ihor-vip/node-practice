const User = require('../dataBase/User');
const {hash} = require('../services/password.service');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().lean();
            const usersNormalize = users.map((user) => userNormalizator(user));

            res.json(usersNormalize);
        } catch (e) {
            res.json(e.message);
        }
    },

    getOneUser: (req, res) => {
        try {
            let user = req.user;
            user = userNormalizator(user);

            res.json({user});
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let delUser = await User.findByIdAndDelete(user_id).lean();
            delUser = userNormalizator(delUser);

            res.json(delUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashPassword = await hash(req.body.password);

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
};
