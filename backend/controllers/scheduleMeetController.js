const userData = require('../models/userDataModel')
const mailer = require('../utils/mailer')

exports.scheduleMeetController = async (req, res) => {
    try{
        const { schedule } = req.body;
        const newData = await userData.updateOne({email: req.body.email}, { $push: {schedule: req.body.schedule}});

        if (!newData) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        await mailer(
            schedule.email,
            'Meeting Scheduled',
            `Hello,\n\nYou have a new meeting scheduled. Here is your meeting link:\n\n${schedule.link}\n\n from ${schedule.startTime} - ${schedule.endTime} on ${schedule.date}\n\nThank you!`
        );

        res.status(201).json({
            status: 'success',
            message: 'User created successfully and mail sent',
            data: newData
        })
    }
    catch(err){
        console.error("Error creating user:", err);
        res.status(400).json({
            status: 'failed',
            error: err.message
        })
    }
}
exports.getAllScheduleController = async (req, res) => {
    try{
        const username = req.query.email;
        const users = await userData.find({email: username}, undefined, undefined);
        res.status(200).json({
            status: 'success',
            name: users[0].name,
            allSchedules: users[0].schedule
        });
    }catch(err){
        res.status(400).json({
            status: 'failed',
            error: err.message
        })
    }
}
exports.deleteScheduleController = async (req, res) => {
    try{
        const scheduleId = req.query.id;
        const username = req.query.email;
        const user = await userData.findOneAndUpdate(
            {email: username},
            {$pull:{ schedule:{id: scheduleId}}},
            {new: true}
        );
        if (!user){
            return res.status(404).json({
                status: 'error',
                message: 'No schedule found with this id'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Schedule deleted successfully',
            updatedUser: user
        });
    }catch( error){
        res.status(500).json({
            status: 'error',
            message: error.message
    });}
}
exports.calendarEventController = async (req, res) => {
    try{
        const username = req.query.email;
        const users = await userData.find({email: username}, undefined, undefined);
        res.status(200).json({
            status: 'success',
            allSchedules: users[0].schedule
        });
    }catch(err){
        res.status(400).json({
            status: 'failed',
            error: err.message
        })
    }
}
exports. resendEmailController = async (req, res) => {
    try {
        const { schedule } = req.body;

        await mailer(
            schedule.email,
            'Resend: Meeting Scheduled',
            `Hello,\n\nHere is your meeting link again:\n\n${schedule.link}\n\n from ${schedule.startTime} - ${schedule.endTime} on ${schedule.date}\n\nThank you!`
        );

        res.status(200).json({ message: "Email resent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to resend email." });
    }
}