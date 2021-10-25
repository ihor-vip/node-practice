const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove');

module.exports = () => {
    cron.schedule('0 0 0 1 * *', async () => {
        console.log('Cron started at', new Date().toISOString());
        await removeOldTokens();
        console.log('Cron finished at', new Date().toISOString());

    });
};
