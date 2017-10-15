const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({

    originalUrl: String,
    shorterUrl: String

}, {
    timestamps: true
});

var modelClass = mongoose.model('shortUrls', urlSchema);

module.exports = modelClass;