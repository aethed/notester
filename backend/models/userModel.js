const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please insert a name']
    },
    email: {
        type: String,
        required: [true, 'Please insert an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please insert a password']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)