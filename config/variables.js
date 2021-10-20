module.exports = {
    PORT: process.env.PORT || 5000,
    DBPath: process.env.DBPath || 'mongodb://localhost:27017/june-2021',
    FRONTEND_SITE: process.env.FRONTEND_SITE || 'https://stackoverflow.com/',

    FORM_MASSAGE: 'login form',

    AUTHORIZATION: 'Authorization',
    TOKEN_TYPE_ACCESS: 'access',
    TOKEN_TYPE_REFRESH: 'refresh',
    TOKEN_ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access secret key',
    TOKEN_REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh secret key',
    TOKEN_ACTIVE_SECRET_KEY: process.env.ACTIVE_SECRET_KEY || 'active secret key',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'google@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'Pa$$w0rD',
    EMAIL_FOR_TEST_LETTERS: process.env.EMAIL_FOR_TEST_LETTERS
};
