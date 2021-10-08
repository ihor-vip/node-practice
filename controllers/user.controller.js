const path = require('path');

const {readFile, writeFile} = require('../helpers/user.builder');
const pathDB = path.join(__dirname, '..', 'dataBase', 'users.json');

module.exports = {
    getUsers: async (req, res) => {
        res.json(await readFile(pathDB));
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const users = await readFile(pathDB);
        const user = users.find(user => user.id === +user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        const users = await readFile(pathDB);
        const id = users[users.length - 1].id + 1;

        users.push({...req.body, id});
        await writeFile(pathDB,users);
        res.json(users);
    },

    deleteUser: async (req, res) => {
        const {user_id} = req.params;

        const users = await readFile(pathDB);
        const newUsers = users.filter(user => user.id !== +user_id);

        await writeFile(pathDB, newUsers);

        res.json(newUsers);
    }
};
