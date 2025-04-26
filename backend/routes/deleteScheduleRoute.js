const express = require('express');
const {deleteScheduleController} = require("../controllers/scheduleMeetController");
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userData = require('../models/scheduleSchema.js')

router
.route('/')
.delete(deleteScheduleController)

module.exports = router;