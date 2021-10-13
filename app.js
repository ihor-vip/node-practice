const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {config} = require('./config');
const {authRouter, userRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(config.PORT, (err) => {
    if (!err) {
        console.log(`App Listen ${config.PORT}`);
    }
});

