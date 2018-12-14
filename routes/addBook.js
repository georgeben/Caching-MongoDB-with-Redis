const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookModel = require('../models/Book');

const BookModel = mongoose.model('Books');

router.get('/', (req, res) => {
    res.render('addBook');
})

router.post('/', (req, res) => {
    let title = req.body.title;
    let description = req.body.desc;
    let author = req.body.author;

    console.log(title, description, author);
    // console.log(BookModel)

    const newBook = new BookModel({
        title: title,
        description: description,
        author: author,

    });

    newBook.save((err, success) => {
        if(err){
            console.log('Failed to save', err);
            res.send('Something bad happened')
        }else{

            // res.send('Added successfully '+ success);   
            res.redirect('/')         
        }

    })
    
})

module.exports = router;