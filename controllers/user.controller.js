const path = require('path');

const { readDb, writeToDb } = require('../helpers/users.helpers')

const db = path.join(__dirname, '../', 'dataBase', 'users.json');

module.exports = {
    getUsers: async(req, res) => {
        const users = await readDb(db);

        res.json(JSON.parse(users));
    },

    getUserById: async(req, res) => {
        const {user_id} = req.params;
        const users = await readDb(db);

        res.json(JSON.parse(users).find(item => item.id === +user_id));
    },

    deleteUserById: async(req, res) => {
        const {user_id} = req.params;
        const users = await readDb(db);
        const newUsers = JSON.parse(users).filter(item => item.id !== +user_id);
        await writeToDb(db, newUsers);

        res.json(newUsers);
    },

    createUser: async(req, res) => {
        const users = JSON.parse(await readDb(db));
        users.push({...req.body, id: users[users.length - 1].id + 1});
        await writeToDb(db, users);

        res.json(users);
    },

    updateUserById: async(req, res) => {
        const {user_id} = req.params;
        const users = JSON.parse(await readDb(db));
        const newUsers = users.map(item => item.id === +user_id ? Object.assign(item, req.body) : item);
        await writeToDb(db, newUsers);

        res.json(newUsers);
    },
};
