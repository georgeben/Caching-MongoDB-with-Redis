const express = require('express');
const router = express.Router();
const bookModel = require('../models/Book');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost')

router.get('/', (req, res) =>{
    console.log(req.query.title);

    bookModel.findBookCached(redis, req.query.title, (book) => {
        if(!book){
            console.log('Book not found');
            res.status(500).send('Search failed')
        }else{
            res.locals.book = book;
            res.render("searchResults");
        }
    })
})

module.exports = router;