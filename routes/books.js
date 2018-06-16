const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Book = require('../models/books');
const Reserve = require('../models/reserve');

// Add Book
router.post('/addbook', (req, res, next) => {
    let newBook = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        thumbnailUrl: req.body.thumbnailUrl,
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

// Reserve Book
router.post('/reservebook', (req, res, next) => {
    let newReserve = new Reserve({
        userId: req.body.userId,
        bookId: req.body.bookId,
        time: req.body.time,
        date: req.body.date,
        fines: req.body.fines
    });

    Reserve.addReserve(newReserve, (err, reserve) => {
        if(err){
            res.json({success:false, msg:'Failed to add the reserve'});
        } else {
            res.json({success:true, msg:'Successfully added'});
        }
    });
});

router.get('/pp', (req, res, next) => {
    res.send('This is working');
});


module.exports = router;