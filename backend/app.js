const express = require('express')
const cors = require('cors')
const authenticationRoute = require('./routes/authenticationRoute')
const scheduleMeetRoute = require('./routes/scheduleMeetRoute');
const getAllScheduleRoute = require('./routes/getAllScheduleRoute');
const deleteScheduleRoute = require('./routes/deleteScheduleRoute');
const getCalendarEventRoute = require('./routes/deleteScheduleRoute');
const {json} = require("express");
const resendEmailRoute = require("./routes/resendEmailRoute.js")
const verifyToken = require("./middlewares/userVerification");
const app = express();

app.use(cors())
app.use(json())

app.use('/auth', authenticationRoute)
app.use('/scheduleMeet',verifyToken, scheduleMeetRoute)
app.use('/getAllSchedules',verifyToken, getAllScheduleRoute)
app.use('/deleteSchedule',verifyToken, deleteScheduleRoute)
app.use('/fullCalendar',verifyToken, getCalendarEventRoute)
app.use('/resendEmail',verifyToken, resendEmailRoute)

module.exports = app;