const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    bookTitle: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)