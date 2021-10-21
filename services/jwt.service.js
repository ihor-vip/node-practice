const jwt = require('jsonwebtoken');

const {
    mainVariables: {TOKEN_ACCESS_SECRET_KEY, TOKEN_REFRESH_SECRET_KEY, TOKEN_TYPE_ACCESS},
    statusCodes,
    statusMessages
} = require('../config');
const {ErrorHandler} = require('../errors');

module.exports = {
    generateToken: () => {
        const access_token = jwt.sign({}, TOKEN_ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, TOKEN_REFRESH_SECRET_KEY, {expiresIn: '31d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = TOKEN_TYPE_ACCESS) => {
        try {
            const secretKey = tokenType === TOKEN_TYPE_ACCESS ? TOKEN_ACCESS_SECRET_KEY : TOKEN_REFRESH_SECRET_KEY;

            await jwt.verify(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(statusCodes.invalidToken, statusMessages.invalidToken);
        }
    }
};
