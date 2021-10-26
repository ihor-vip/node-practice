const { userRolesEnum: { ADMIN }, variables: {DEFAULT_ADMIN_PASSWORD} } = require('../config');
const { User } = require('../dataBase');
const { passwordService } = require('../services');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        const hashedPassword = await passwordService.hash(DEFAULT_ADMIN_PASSWORD);

        await User.create({
            name: 'Matt',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: ADMIN,
            is_active: true
        });
    }
};
