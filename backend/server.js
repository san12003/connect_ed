const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path: './config.env'})
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then(() => {
        console.log('Database connection successful!');
    })
    .catch((err) => {
        console.log('Error 💥', err.message)
    })


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})