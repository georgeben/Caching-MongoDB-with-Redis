const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookModel = require('../models/Book');


router.get('/', (req, res) =>{
    bookModel.findAllBooks((err, books) => {
        if(err){
            res.send('SFailed to fetch books')
        }
        res.locals.books = books;
        res.render("index");
    })
})

module.exports = router;