const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookModel = require('../models/Book');
console.log(bookModel)

const BookModel = mongoose.model('Books')

router.get('/', (req, res) =>{
    res.send('Displaying all books');
})

module.exports = router;