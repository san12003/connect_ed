const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userData = require('../models/scheduleSchema.js')
const {getAllScheduleController} = require("../controllers/scheduleMeetController.js");

router
    .route('/')
    .get(getAllScheduleController)

module.exports = router;