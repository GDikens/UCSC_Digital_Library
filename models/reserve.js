const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Reserve Schema
const ReserveSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Reserve = module.exports = mongoose.model('Reserve', ReserveSchema);

module.exports.getReserveById = function(id, callback){
    Reserve.findById(id, callback);
};

module.exports.getReserveByUser = function(userid, callback){
    var objectId = mongoose.Types.ObjectId(userid);
    const query = {userId: objectId};
    Reserve.find(query, callback);
};

module.exports.getReserveByUserCount = function(userid, callback){
    var objectId = mongoose.Types.ObjectId(userid);
    const query = {userId: objectId};
    Reserve.count(query, callback);
};

module.exports.getReserveByBook = function(bookid, callback){
    var objectId = mongoose.Types.ObjectId(bookid);
    const query = {bookId: objectId};
    Reserve.findOne(query, callback);
};

module.exports.deleteReserve = function(userid, bookid, callback){
    var bookobjectId = mongoose.Types.ObjectId(bookid);
    var userobjectId = mongoose.Types.ObjectId(userid);
    const query = {bookId: bookobjectId, userId: userobjectId};
    Reserve.deleteOne(query, callback);
};

module.exports.addReserve = function(newReserve, callback){
    newReserve.save(callback); 
};
