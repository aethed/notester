const asyncHandler = require('express-async-handler')

// @desc    Get books
// @route   GET /api/books 
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get books` })
})

// @desc    Create book
// @route   POST /api/books 
// @access  Private
const createBook = asyncHandler(async (req, res) => {
    if(!req.body.testText) {
        res.status(400)
        throw new Error('Please add a testText field')
    }

    res.status(200).json({ message: `Add book` })
})

// @desc    Update goal
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    res.json({ message: `Update book ${req.params.id}` })
})

// @desc    Delete goals
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete book ${req.params.id}` })
})

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
}