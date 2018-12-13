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