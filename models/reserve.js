const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Reserve Schema
const ReserveSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    fines: {
        type: Number,
        default: '0'
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

module.exports.addRserve = function(newReserve, callback){
    newReserve.save(callback); 
};
