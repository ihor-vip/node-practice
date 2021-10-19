const {passwordService, userService, jwtService: {generateToken}} = require('../services');
const {mainVariables: {FORM_MASSAGE}} = require('../config');
const {userUtil: {userNormalizer}} = require('../utils');
const {OAuth} = require('../dataBase');
const {statusCodes} = require('../config');

module.exports = {
    renderLoginForm: (req, res, next) => {
        try {
            res.json(FORM_MASSAGE);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { item: user, password } = req.body;

            await passwordService.compare(user.password, password);

            const tokenPair = generateToken();

            await userService.createItem(OAuth, { ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizer(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res) => {
        try {
            const {user} = req;

            await OAuth.deleteOne({user_id: user._id});

            res.end();
        } catch (e) {
            res.json(e.message);
        }
    },

    refresh: async (req, res) => {
        try {
            const {user} = req;

            const tokenRefreshPair = generateToken();

            const newUser = userNormalizer(user);

            await OAuth.findByIdAndUpdate({user_id:newUser._id},{...tokenRefreshPair});

            res.json({user: newUser, ...tokenRefreshPair}).status(statusCodes.created);
        } catch (e) {
            res.json(e.message);
        }
    }
};

