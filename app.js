const express = require('express');

const mongoose = require('mongoose');

const { config } = require('./config');
const { authRouter, userRouter } = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(config.PORT, (err) => {
    if (!err) {
        console.log(`App Listen ${config.PORT}`);
    }
});

