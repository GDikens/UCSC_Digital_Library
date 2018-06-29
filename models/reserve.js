const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Reserve Schema
const ReserveSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId,
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

module.exports.getReserveByUser = function(title, callback){
    const query = {title: title};
    Reserve.findOne(query, callback);
};

module.exports.getReserveByBook = function(title, callback){
    const query = {title: title};
    Reserve.findOne(query, callback);
};

module.exports.addReserve = function(newReserve, callback){
    newReserve.save(callback); 
};
