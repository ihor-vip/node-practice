const bcrypt = require('bcrypt');
const {ErrorHandler, ErrorStatus, ErrorMessages} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(ErrorStatus.UNAUTHORIZED, ErrorMessages.WRONG_AUTH);
        }
    }
};
