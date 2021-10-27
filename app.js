const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const {variables: {PORT, MONGO_CONNECT, NODE_ENV, ALLOWED_ORIGIN, },
    statusMessages: { corsNotAllowed }
} = require('./config');
const { ErrorHandler } = require('./errors');
const startCron = require('./cron');
const { checkDefaultData } = require('./utils');
const swaggerJson = require('.docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT);

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {authRouter, userRouter, carRouter} = require('./routes');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || PORT)
        .json({
            message: err.message
        });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log('App listen on ', PORT);
        checkDefaultData();
        startCron();
    }
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(corsNotAllowed), false);
    }

    return callback(null, true);
}
