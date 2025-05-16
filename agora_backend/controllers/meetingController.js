const {RtcRole, RtcTokenBuilder} = require("agora-access-token");

const APP_ID = '4d719594042d4baa8a6a83eb1dae8117';
const APP_CERTIFICATE = 'c2d111e7aefa49b39040af0e42023758';

module.exports = (req, res) => {
    const channelName = req.query.channel;
    if(!channelName){
        res.status(400).json({error:'channel name required'});
    }
    const uid = 0;
    const role = RtcRole.PUBLISHER;
    const expirationTime = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        uid,
        role,
        privilegeExpiredTs
    );
    res.json({ token, appId: APP_ID });
}
