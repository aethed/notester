const express = require('express') //express is the backend web framework
const colors = require('colors')
const dotenv = require('dotenv').config() //allows us to have environment variables
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000 //port for server to run on

connectDB()


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))