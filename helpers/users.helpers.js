const fs = require('fs');
const util = require('util');

const readDbPromise = util.promisify(fs.readFile);
const writeDbPromise = util.promisify(fs.writeFile);

const readDb = (db) => readDbPromise(db);

const writeToDb =(db, data) => writeDbPromise(db, JSON.stringify(data));

module.exports = {
    readDb,
    writeToDb
};
