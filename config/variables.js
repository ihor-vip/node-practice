module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_CONNECT: process.env.MONGO_CONNECT || 'mongodb://localhost:27017/june-2021',
    FORM_MASSAGE: 'login form',

    AUTHORIZATION: 'Authorization',
    TOKEN_TYPE_ACCESS: 'access',
    TOKEN_TYPE_REFRESH: 'refresh',
    TOKEN_ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'secret word',
    TOKEN_REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'secret refresh word'
};
