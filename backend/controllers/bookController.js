// star

const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')
const User = require('../models/userModel')

// @desc    Get books
// @route   GET /api/goals
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.user.id })

  res.status(200).json(books)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createBook = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const book = await Book.create({
    text: req.body.text,
    user: req.user.id,
    description: req.user.description,
  })

  res.status(200).json(book)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
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

  // Make sure the logged in user matches the goal user
  if (book.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedBook)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
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

  // Make sure the logged in user matches the goal user
  if (book.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await book.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getBooks: getBooks,
  createBook: createBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
}