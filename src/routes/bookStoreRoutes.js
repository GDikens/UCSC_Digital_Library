var express = require('express');
var bookStoreRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav){
    
    
    bookStoreRouter.route('/')
        .get(function(req,res){
            var url = 'mongodb://localhost:27017/ucscdigitallibrary';

            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');

                collection.find({}).toArray(
                    function (err, results) {
                        res.render('bookstore',{
                            title:'UCSC Digital Library Book Store',
                            nav:nav,
                            books:results
                        });
                    }
                );     
            });
    });     

    
    bookStoreRouter.route('/:id')
        .get(function(req,res){
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/ucscdigitallibrary';

            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');

                collection.findOne({_id: id},
                    function (err, results) {
                        res.render('bookView',{
                            title:'UCSC Digital Library Book Store',
                            nav:nav,
                            books:results
                        });
                    }
                );       
            });
    });

    return bookStoreRouter;

};

module.exports = router;