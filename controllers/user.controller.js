const {
    emailActionsEnum: {
        ACCOUNT_CREATE,
        ACCOUNT_DELETE_ADMIN,
        ACCOUNT_DELETE_USER,
        ACCOUNT_UPDATE
    },
    statusCodes,
    statusMessages,
    tokenPurposeEnum,
    variables,
    userRolesEnum
} = require('../config');
const {User, TokenActive} = require('../dataBase');
const {
    userService,
    emailService,
    passwordService,
    jwtService
} = require('../services');
const {userUtil: {userNormalizer}} = require('../utils');

module.exports = {
    create: async (req, res, next) => {
        try {
            const user = req.body;

            const hashedPassword = await passwordService.hash(user.password);
            const createdUser = await userService.createItem(User, {
                ...user,
                password: hashedPassword
            });

            const userToReturn = userNormalizer(createdUser);

            const token = jwtService.generateActiveToken();

            await userService.createItem(
                TokenActive,
                {...token, token_purpose: tokenPurposeEnum.activateAccount, user: createdUser.id}
            );

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || createdUser.email,
                ACCOUNT_CREATE,
                {
                    userName: createdUser.name,
                    activeTokenLink: `${variables.FRONTEND_SITE}?${variables.AUTHORIZATION}=${token.active_token}`
                }
            );

            res.status(statusCodes.created).json({
                ...token,
                user: userToReturn
            });
        } catch (e) {
            next(e);
        }
    },

    activateAccount: async (req, res, next) => {
        try {
            const user = req.activeUser;

            await userService.updateItemById(User, user.id, {activatedByEmail: true});

            res.json(statusMessages.activatedAccount);
        } catch (e) {
            next(e);
        }
    },

    getAllOrByQuery: async (req, res, next) => {
        try {
            const {query} = req;

            const users = await userService.findItemsByQuery(User, query);

            const usersToReturn = users.map((item) => userNormalizer(item));

            res.json(usersToReturn);
        } catch (e) {
            next(e);
        }
    },

    getOneById: (req, res, next) => {
        try {
            const {item: user} = req.body;

            const userToReturn = userNormalizer(user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userData = req.body;

            await userService.deleteItemById(User, user_id);

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || userData.item.email,
                req.userPermission === userRolesEnum.ADMIN ? ACCOUNT_DELETE_ADMIN : ACCOUNT_DELETE_USER,
                {
                    userName: userData.name || userData.item.name,
                }
            );

            res.status(statusCodes.deleted).json(statusMessages.deleted);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userData = req.body;

            await userService.updateItemById(User, user_id, userData);

            await emailService.sendMail(
                variables.EMAIL_FOR_TEST_LETTERS || userData.item.email,
                ACCOUNT_UPDATE,
                {userName: userData.name || userData.item.name}
            );

            res.status(statusCodes.updated).json(statusMessages.updated);
        } catch (e) {
            next(e);
        }
    }
};
