const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    }
});

const Book = mongoose.model('Books', bookSchema);


module.exports.findBook = (name, callback) => {
    Book.findOne({
        name: name,
    }, callback)
}

module.exports.findAllBooks = (callback) => {
    Book.find({}, callback)
}

module.exports.findBookCached = (redis, title, callback) => {
    redis.get(title, (err, response) => {
        if(err){
            console.log("Book was not found in")
            callback(null)
        }else if(response) {
            callback(JSON.parse(response))
        }else{
            Book.findOne({
                title: title,
            }, (err, data) => {
                if(err) {
                    console.log('Not found in the db');
                    callback(null)
                }else{
                    redis.set(title, JSON.stringify(data), () => {
                        callback(data)
                    })
                }
            })
        }
    })
}