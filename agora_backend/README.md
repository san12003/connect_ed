.# Agora Backend - Connect-Ed

## About

This small Node.js server generates Agora tokens for secure video call sessions.

## Tech Stack

- Node.js
- Express.js
- Agora RTC SDK Server

## Setup

```bash
cd agora_backend
npm install
npm start
```

The server will run on [http://localhost:4000](http://localhost:4000).

## Environment Variables (.env)

```env
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

## Routes

- `GET /generate-token?channel=channelName` — Returns Agora RTC token for joining the specified channel.

## Testing Status

- Token generation tested successfully with valid channels.

## Notes

- Make sure to allow less secure apps in your Gmail or use an App Password.
- All three servers (frontend, backend, agora-backend) must be running for full functionality.
- Frontend and backend URLs are hardcoded for development. Adjust them accordingly for production deployment.
