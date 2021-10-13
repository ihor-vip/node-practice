const bcrypt = require('bcrypt');

const {ErrorHandler, ErrorStatus, ErrorMessages} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(ErrorStatus.BAD_REQUEST, ErrorMessages.EMAIL_OR_PASSWORD_IS_WRONG);
        }
    }
};
