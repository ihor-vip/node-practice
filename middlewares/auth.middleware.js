const {User, O_Auth} = require('../dataBase');
const {userService, jwtService} = require('../services');
const {ErrorHandler} = require('../errors');
const {authValidator} = require('../validators');
const {
    mainVariables: {AUTHORIZATION, TOKEN_TYPE_REFRESH},
    statusCodes,
    statusMessages
} = require('../config');
const userUtil = require('../utils/user.util');

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
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.noToken);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
            }

            req.token = token;
            req.user = userUtil.userNormalizer(tokenResponse.user_id.toObject());

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.noToken);
            }

            await jwtService.verifyToken(token, TOKEN_TYPE_REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(statusCodes.invalidToken, statusMessages.noToken);
            }

            req.user = tokenResponse;

            next();
        } catch (e) {
            next(e);
        }
    }
};
