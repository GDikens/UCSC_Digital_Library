const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Book Schema
const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    thumbnailUrl: {
        type: String
    },
    shortDescription: {
        type: String
    },
    authors: {
        type: String,
        required: true
    },
    numberOfCopys: {
        type: Number,
        required: true
    },
    copysLeft: {
        type: Number,
        default: '0',
        required: true
    }
});

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);
};

module.exports.getBookByTitle = function(title, callback){
    const query = {title: title};
    Book.findOne(query, callback);
};

module.exports.addBook = function(newBook, callback){
    newBook.save(callback); 
};