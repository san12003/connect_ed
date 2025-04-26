# Connect-Ed

## About

Connect-Ed is a complete platform for scheduling, managing, and conducting online meetings between teachers and parents. It includes:
- **Frontend**: React.js for user interaction
- **Backend**: Node.js + Express.js for user authentication, meeting management, and email notifications
- **Agora Backend**: Node.js server for generating real-time video call tokens

All three servers run independently.

## Tech Stack

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Nodemailer, JWT
- **Video Call**: Agora RTC SDK + Custom Token Server

## Project Structure

```
ConnectEd/
├── frontend/        # React Frontend
├── backend/         # Express API Backend
├── agora-backend/   # Agora Token Backend
└── README.md        # Main project README
```

## How to Run

Each part should be started separately:

## Test Account

A test account has been pre-created for your convenience:

- **Email**: prasad9sanjana@gmail.com
- **Password**: aezakmi

## Design Files

The design files used for this project are included inside the ConnectEd folder itself.

### 1. Backend Server (User Authentication and Scheduling)

```bash
cd backend
npm install
npm start
```
Runs on: [http://localhost:8080](http://localhost:8080)

### 2. Agora Token Backend

```bash
cd agora-backend
npm install
npm start
```
Runs on: [http://localhost:4000](http://localhost:4000)

### 3. Frontend Server

```bash
cd frontend
npm install
npm run dev
```
Runs on: [http://localhost:{port}](http://localhost:{port})