const userData = require('../models/userDataModel')
const {compare} = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.registerController = async (req, res) => {
    try {
        const newData = await userData.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Account successfully created',
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
};

exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await userData.findOne({email});
    if (!user)
        return res.status(404)
            .json({ error: 'User not found'});

    const isMatch = await compare(password, user.password);
    console.log(password === user.password)
    if (!isMatch)
        return res.status(401)
            .json({ error: 'Invalid credentials' });

    const token = generateToken(user.email);
    res.status(200).json({ token });
}