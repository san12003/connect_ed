const express = require('express')
const cors = require('cors')
const authenticationRoute = require('./routes/authenticationRoute')
const scheduleMeetRoute = require('./routes/scheduleMeetRoute');
const getAllScheduleRoute = require('./routes/getAllScheduleRoute');
const deleteScheduleRoute = require('./routes/deleteScheduleRoute');
const {json} = require("express");
const {calendarEventController} = require("./controllers/scheduleMeetController");
const resendEmailRoute = require("./routes/resendEmailRoute.js")
const app = express();

app.use(cors())
app.use(json())

app.use('/auth', authenticationRoute)
app.use('/scheduleMeet', scheduleMeetRoute)
app.use('/getAllSchedules', getAllScheduleRoute)
app.use('/deleteSchedule', deleteScheduleRoute)
app.use('/fullCalendar',calendarEventController)
app.use('/resendEmail',resendEmailRoute)
module.exports = app;