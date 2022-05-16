const express = require('express')
const router = express.Router()
const { 
    getBooks, 
    createBook, 
    updateBook, 
    deleteBook 
} = require('../controllers/bookController')

router.route('/').get(getBooks).post(createBook)
router.route('/:id').delete(deleteBook).put(updateBook)

module.exports = router