const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');
const { variables } = require('../config');

module.exports = () => {
    cron.schedule(variables.CRON_EXP_OLD_TOKENS, async () => {
        await removeOldTokens();
    });
};
