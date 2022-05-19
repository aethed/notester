const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    bookTitle: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)