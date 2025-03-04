const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true }
});

const User = mongoose.model('User', authUserSchema);
module.exports = User;