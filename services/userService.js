const USER = require('../dataBase/User');

module.exports = {
    findUser: () => USER.find(),

    findUserById: (user_id) => USER.findById(user_id),

    findUserByEmail: (email) => USER.findOne({email})

};
