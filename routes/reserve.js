const express = require('express');
const router = express.Router();

const config = require('../config/database');
const Book = require('../models/books');
const Reserve = require('../models/reserve');


// Reserve Book
router.post('/reservebook', (req, res, next) => {
    let newReserve = new Reserve({
        userId: req.body.userId,
        bookId: req.body.bookId,
        time: req.body.time,
        date: req.body.date
    });

    Book.updateCopysLeft(bookId, (err, book) => {
        if(err){
            res.json({success:false, msg:'Failed to update the book schema'});
        } else {
            res.json({success:true, msg:'Successfully updated the book schema'});
        }
    });

    Reserve.addReserve(newReserve, (err, reserve) => {
        if(err){
            res.json({success:false, msg:'Failed to add the reserve'});
        } else {
            res.json({success:true, msg:'Successfully reserved the book'});
        }
    });
});


module.exports = router;