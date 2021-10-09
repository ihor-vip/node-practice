const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('User with this email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserByIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);
            req.user = user;

            if (!user) {
                throw new Error('Not found user with this ID');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
