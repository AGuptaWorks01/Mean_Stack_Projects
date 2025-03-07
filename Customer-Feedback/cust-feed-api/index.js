const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRouters = require('./routers/authRoutes')
const custRouters = require('./routers/custRoutes')

const app = express()
const PORT = process.env.PORT;
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully!"))
    .catch((err) => console.log(err))

app.use('/api/auth', authRouters)
app.use('/api/feed', custRouters)
app.listen(PORT, console.log(`server running on http://localhost:${PORT}`))