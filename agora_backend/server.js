const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const cors=require('cors')
const app = require('./app')


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Token server running on port ${PORT}`)
});