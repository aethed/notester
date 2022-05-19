const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')

// @desc    Get books
// @route   GET /api/books 
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user.id })

    res.status(200).json(books)
})

// @desc    Create book
// @route   POST /api/books 
// @access  Private
const createBook = asyncHandler(async (req, res) => {
    if (!req.body.bookTitle) {
        res.status(400)
        throw new Error('Please add a bookTitle field')
    }

    const book = await Book.create({
        bookTitle: req.body.bookTitle,
        user: req.user.id,
    })

    res.status(200).json(book)
})

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    const user = await User.findById(req.user.id)

        // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
        

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updatedBook)
})

// @desc    Delete books
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Book.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
}