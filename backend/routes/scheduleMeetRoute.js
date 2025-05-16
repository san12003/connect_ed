const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userData = require('../models/scheduleSchema.js')
const {scheduleMeetController} = require("../controllers/scheduleMeetController");

router
    .route('/')
    .post(scheduleMeetController)

module.exports = router;