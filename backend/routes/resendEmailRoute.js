const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userData = require('../models/scheduleSchema.js')
const {resendEmailController} = require("../controllers/scheduleMeetController");

router
    .route('/')
    .post(resendEmailController)

module.exports = router;