const {userNormalizator} = require("../util/user.util");

module.exports = {
    login: (req, res, next) => {
        try {
            const {user} = req;

            const userNormalized = userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    }
};
