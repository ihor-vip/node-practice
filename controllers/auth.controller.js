const {passwordService, jwtService: {generateToken}} = require('../services');
const {mainVariables: {FORM_MASSAGE}} = require('../config');
const {userUtil: {userNormalizer}} = require('../utils');
const O_Auth = require('../dataBase/O_Auth');
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
            const {user, password} = req.body;

            await passwordService.compare(user.password, password);

            const tokenPair = generateToken();

            const userForResponce = userNormalizer(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userForResponce._id
            });

            res.json({
                user: userForResponce,
                ...tokenPair
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

            await OAuth.findByIdAndUpdate({user_id: newUser._id}, {...tokenRefreshPair});

            res.json({user: newUser, ...tokenRefreshPair}).status(statusCodes.created);
        } catch (e) {
            res.json(e.message);
        }
    }
};

