const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')

// @desc    Get books
// @route   GET /api/books 
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find()

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
        bookTitle: req.body.bookTitle
    })

    res.status(200).json(book)
})

// @desc    Update goal
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updatedBook)
})

// @desc    Delete goals
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(400)
        throw new Error('Book not found')
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