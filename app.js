const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {variables: {PORT, MONGO_CONNECT}} = require('./config');

const app = express();

mongoose.connect(MONGO_CONNECT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {authRouter, userRouter} = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
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
    }
});

