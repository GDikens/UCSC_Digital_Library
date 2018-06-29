const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Book = require('../models/books');
 

// Add Book
router.post('/addbook', (req, res, next) => {
    let newBook = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        shortDescription: req.body.shortDescription,
        authors: req.body.authors,
        numberOfCopys: req.body.numberOfCopys,
        copysLeft:req.body.copysLeft
    });

    Book.addBook(newBook, (err, book) => {
        if(err){
            res.json({success:false, msg:'Failed to add the book'});
        } else {
            res.json({success:true, msg:'Successfully added the book'});
        }
    });
});

// Get Some books
router.get('/getsomebooks', (req, res, next) => {
    Book.getTenBooks((err, books) => {
        if(err){
            res.json({success:false, msg:'Failed to get books'});
        } else {
            res.json(books);
        }
    });
});

// Get book titles
router.get('/getbooktitle', (req, res, next) => {
    
    Book.getBookByTitle(req.query.title, (err, book) => {
        if(err){
            res.json({success:false, msg:'Failed to get book by title', error: err});
        } else {
            res.json(book);
        }
    });

});


module.exports = router;