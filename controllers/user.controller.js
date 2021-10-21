const {User} = require('../dataBase');
const {userService, passwordService} = require('../services');
const {statusCodes, statusMessages} = require('../config');
const {userUtil: {userNormalizer}} = require('../utils');

module.exports = {
    create: async (req, res, next) => {
        try {
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);
            const createdUser = await userService.createItem(User, {...req.body, password: hashedPassword});

            const userToReturn = userNormalizer(createdUser);

            res.status(statusCodes.created).json(userToReturn);
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
            const {user} = req;

            const userToReturn = userNormalizer(user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await userService.deleteItemById(User, user_id);

            res.status(statusCodes.deleted).json(statusMessages.deleted);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const newUserData = req.body;

            await userService.updateItemById(User, user_id, newUserData);

            res.status(statusCodes.updated).json(statusMessages.updated);
        } catch (e) {
            next(e);
        }
    }
};
