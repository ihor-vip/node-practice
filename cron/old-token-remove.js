const dayJS = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJS.extend(utc);

const {TokenAuth} = require('../dataBase');

module.exports = async () => {
    const previousMonth = dayJS.utc().subtract(1, 'month');

    const deleteInfo = await TokenAuth.deleteMany({
        createdAt: {$lt: previousMonth}
    });

    console.log(deleteInfo);
};
