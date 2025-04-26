const express = require('express');
const router = express.Router();
const { loginController, registerController} = require("../controllers/authenticationController");
const verifyToken = require("../middlewares/userVerification");

router
    .route('/login')
    .post(loginController)

router
    .route('/register')
    .post(registerController)

router
    .route('/protected')
    .get(verifyToken, (req, res) => {
        res.status(200).json({
            message: 'You are successfully authenticated'
        });
    })
module.exports = router;