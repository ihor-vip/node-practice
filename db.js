const mongoose = require("mongoose");

const mongoDBURL = 'mongodb+srv://ihor:volodya1@cluster0.8ej0u.mongodb.net/mern-rooms'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

const dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose