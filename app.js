const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');
const { MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${PORT}`);
});
