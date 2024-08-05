const express = require('express')
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()


const port = process.env.PORT || 5000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/admin', require('./routes/adminRoute'))
app.use(errorHandler)
app.listen(port, () => console.log(`server started in http://localhost:${port}`.yellow))