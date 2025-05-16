const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const meetingController = require("../controllers/meetingController");
const router = express.Router();

router.
route('/generate-token')
    .get(meetingController)
module.exports = router;