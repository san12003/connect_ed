const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const scheduleSchema = require('./scheduleSchema');

const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    schedule: [scheduleSchema]
});

userDataSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const userDataModel = mongoose.model('userdata', userDataSchema);

module.exports = userDataModel;