const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

    endTime:{
        type: String,
        required: true,
    },

    startTime: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
})
module.exports= scheduleSchema