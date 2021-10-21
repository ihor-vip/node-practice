const { emailActionsEnum } = require('../config');

module.exports = {
    [emailActionsEnum.DELETED_USER]: {
        templateName: 'deleted_user',
        subject: 'Your account was deleted'
    },

    [emailActionsEnum.REGISTERED_USER]: {
        templateName: 'registered_user',
        subject: 'Your account was created'
    },

    [emailActionsEnum.UPDATED_USER]: {
        templateName: 'updated_user',
        subject: 'Your account was updated'
    }
};

