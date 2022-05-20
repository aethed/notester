const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },

    description: {
        type: String,
        required: [true, 'Please add a text value for your descriptoin']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)