const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const user = await User.findOne({name:req.body.name, email: req.body.email, password: req.body.password});

            if (user) {
                throw new Error('Current user already in Database');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    authUserMiddleware: async (req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const user = await User.findOne({name, email, password});

            if (!user) {
                throw new Error('No user');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
