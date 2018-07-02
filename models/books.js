const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    var objectId = mongoose.Types.ObjectId(id);
    //console.log(objectId);
    Book.findById(objectId, callback);
};

module.exports.getBookByTitle = function(title, callback){
    var keyword = new RegExp(title, 'i');
    Book.find({title: keyword}, callback);
    console.log(title);
};

module.exports.addBook = function(newBook, callback){
    newBook.save(callback); 
};

module.exports.getTenBooks = function(callback){
    Book.find({},callback).limit(10);
};

module.exports.updateCopysLeft = function(id, callback){
    var objectId = mongoose.Types.ObjectId(id);
    Book.findByIdAndUpdate(objectId, { $inc: { copysLeft: -1 } }, { new: true }, callback);
    //Book.findById(objectId, callback);
};

module.exports.updateCopysLeftBack = function(id, callback){
    var objectId = mongoose.Types.ObjectId(id);
    Book.findByIdAndUpdate(objectId, { $inc: { copysLeft: 1 } }, { new: true }, callback);
    //Book.findById(objectId, callback);
};