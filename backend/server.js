const express = require('express') //express is the backend web framework
const dotenv = require('dotenv').config() //allows us to have environment variables
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000 //port for server to run on

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/books', require('./routes/bookRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))