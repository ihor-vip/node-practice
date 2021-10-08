const fs = require('fs');
const util = require('util');

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

async function readFile(path) {
    const data = await read(path);
    return JSON.parse(data);
}

async function writeFile(path, data) {
    await write(path, JSON.stringify(data));
}

module.exports = {
    readFile,
    writeFile
};
