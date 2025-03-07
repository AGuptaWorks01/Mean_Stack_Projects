const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

const AuthRoute = require('./routers/authRoute')
const TaskRoute = require('./routers/taskRoute')

const app = express()
PORT = process.env.PORT || 8080;
app.use(cors())
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('Connected to MongoDB') })
    .catch((err) => { console.error('MongoDB connection error:', err) });


app.use('/api/auth', AuthRoute)
app.use('/api/book', TaskRoute)
app.listen(PORT, console.log(`server running on http://localhost:${PORT}`))