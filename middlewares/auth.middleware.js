const {User, O_Auth} = require('../dataBase');
const { userService, jwtService} = require('../services');
const {statusCodes, statusMessages} = require('../config');
const {ErrorHandler} = require('../errors');
const {authValidator} = require('../validators');
const {AUTHORIZATION}=require('../config/variables');

module.exports = {
    isUserEmailPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findItem(User, {email});

            if (!userByEmail) {
                throw new ErrorHandler(statusCodes.notValidData, statusMessages.notLogined);
            }

            req.body.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateLoginationData: (req, res, next) => {
        try {
            const {error} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.notValidData, statusMessages.notLogined);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.forbidden, statusMessages.accessDenied);
            }

            jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            jwtService.verifyToken(token, 'refresh');

            const tokenResponse = await O_Auth.findOne({refresh_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            await O_Auth.deleteOne({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
