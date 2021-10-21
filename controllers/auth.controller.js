const {passwordService, jwtService: {generateToken}} = require('../services');
const {mainVariables: {FORM_MASSAGE}} = require('../config');
const {userUtil: {userNormalizer}} = require('../utils');
const O_Auth = require('../dataBase/O_Auth');

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

    refresh: async (req, res, next) => {
        try {
            const {refresh_token, user_id} = req.user;

            await O_Auth.deleteOne({refresh_token});

            const tokenPair = generateToken();

            await O_Auth.create({
                ...tokenPair,
                user_id
            });

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.token;

            await O_Auth.findOneAndDelete({access_token: token});

            res.json('log in');
        } catch (e) {
            next(e);
        }
    }
};
