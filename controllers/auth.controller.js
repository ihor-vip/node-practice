const { passwordService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {body: {password}, user} = req;

            await passwordService.compare(user.password, password);

            res.redirect('/users');
        } catch (e) {
            next(e);
        }
    }
};
