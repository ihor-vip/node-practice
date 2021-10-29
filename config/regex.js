module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,128}$/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ID_REGEXP: new RegExp('^[0-9a-fA-F]{24}$'),
    DOMAIN: new RegExp('^.*\\/\\/[^\\/]+\\/')
};
