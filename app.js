const express = require('express');

const mongoose = require('mongoose');

const {MONGO_CONNECT, PORT} = require('./config/config');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

const app = express();

mongoose.connect(MONGO_CONNECT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`App Listen ${PORT}`);
    }
});

