module.exports = {
    PORT: process.env.Port || 5000,
    MONGO_CONNECT: process.env.MONGO_CONNECT || 'mongodb://localhost:27017/june-2021',

    VAR_BODY: 'body',
    VAR_ID: 'id',
    VAR_ID_DB_FIELD: '_id',
    VAR_PARAMS: 'params'
};
