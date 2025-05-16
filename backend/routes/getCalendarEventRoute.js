const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userData = require('../models/scheduleSchema.js')
const {calendarEventController} = require("../controllers/scheduleMeetController");

router
    .route('/')
    .get(calendarEventController)

module.exports = router;