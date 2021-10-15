const userUtil = require('../util/user.util');

module.exports = {
    login: (req, res) => {
        const user = req.user;

        const normalizedUser = userUtil.userNormalizator(user.toObject());

        res.json(normalizedUser);
    }
};
