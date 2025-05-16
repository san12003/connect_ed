const express = require('express')
const { RtcTokenBuilder, RtcRole } = require('agora-access-token')
const meetingRoute = require('./routes/meetingRoute')
const cors=require('cors')

const app = express()

app.use(cors())
app.use('/', meetingRoute)

module.exports=app;