const User = require('../dataBase/User');

module.exports = {
    authorizationUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email, password});

            if (!user) {
                throw new Error('Email or password does not match');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
