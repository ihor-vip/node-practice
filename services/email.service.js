const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { mainVariables, statusCodes, statusMessages } = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mainVariables.NO_REPLY_EMAIL,
        pass: mainVariables.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(statusCodes.serverError, statusMessages.wrongTemplate);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
