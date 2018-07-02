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

    Reserve.getReserveByUserCount(newReserve.userId, (err, count) => {

        if(err){
            res.json({success: false, msg:'Failed to get the reservations'});

        } else {

            if(count == 2){
                res.json({success: false, msg:'Sorry, you are out of reservations'});
                
            } else {

                Book.getBookById(newReserve.bookId, (err,book) => {
                    if(err){
                        res.json({success:false, msg:'Failed to get the book'});
            
                    } else {
            
                        if(book.copysLeft == 0){
                            res.json({success:false, msg:'All the copys of this book is gone'});
            
                        } else if(book.copysLeft <= book.numberOfCopys){
            
                            Book.updateCopysLeft(newReserve.bookId, (err, book) => {
            
                                if(err){
                                    res.json({success:false, msg:'Failed to update Book schema'});
                                } else {
            
                                    Reserve.addReserve(newReserve, (err, reserve) => {
            
                                        if(err){
                                            res.json({success:false, msg:'Failed to add the reserve'});
                                        } else {
                                            res.json({success:true, msg:'Successfully reserved the book'});
                                        }
            
                                    });
                                }
            
                            });
                        }
                    }
                });
            
            }

        }
    });

});

router.get('/getreserve', (req, res, next) => {

    Reserve.getReserveByUser(req.query.userId, (err, reserve) => {
        if(err){
            res.json({success: false, msg:'Failed to get the reserve'});
        } else {
            res.json(reserve);
        }
    });

});

router.get('/deletereserve', (req, res, next) => {

    var error = 0;

    //const bookList = JSON.parse(req.query.bookList);
    const reserves = JSON.parse(req.query.bookList);
    
    for(var i=0;i<reserves.length;i++){
        
        const bookList = {
            bookId:reserves[i].bookId,
            userId:reserves[i].userId
        };

        Book.getBookById(bookList.bookId, (err, book) => {

            if(err){
                error++;
            
            } else {
                
                if(book.numberOfCopys == book.copysLeft){
                    error++;
                
                } else if(book.numberOfCopys > book.copysLeft) {
    
                    Book.updateCopysLeftBack(bookList.bookId, (err, book) => {
    
                        if(err){
                            error++;
                
                        } else {
                
                            Reserve.deleteReserve(bookList.userId, bookList.bookId, (err, reserve) => {
                
                                if(err){
                                    error++;
                                
                                } else {
                                    error = 0;
                                }
                
                            });
                        }
                    });
                    
                }
            }
    
        });

    }

    if(error>0){
        console.log(error);
        res.json({success: false, msg:'Failed to delete reservations'});
    } else {
        console.log(error);
        res.json({success: true, msg:'Successfully returned the books'});
    }

});


module.exports = router;