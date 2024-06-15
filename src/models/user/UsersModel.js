

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName:{type: String},
    lastName:{type: String},
    email :{type: String, unique: true},
    password:{type: String},
    photo :{type: String},
    createdDate:{type: Date, default: Date.now ()},
    
},{versionKey: false});

const UsersModel = mongoose.model("users", userSchema);
module.exports = UsersModel