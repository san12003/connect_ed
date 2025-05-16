# Backend - Connect-Ed

## About

This is the Node.js backend server for **Connect-Ed**. It handles:
- User Authentication (JWT)
- Scheduling meetings
- Sending meeting links via email (Nodemailer)

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Nodemailer

## Setup

```bash
cd backend
npm install
npm start
```

The backend server will run at [http://localhost:8080](http://localhost:8080).

## Environment Variables (.env)

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_app_password
```

## API Routes

- `POST /auth/login` — User login
- `POST /auth/register` — User registration
- `POST /scheduleMeet` — Schedule a new meeting
- `POST /deleteSchedule` — Delete a meeting
- `GET /getAllSchedules?email=...` — Get all scheduled meetings for a user
- `POST /resend-email` — Resend meeting email