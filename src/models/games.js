const mongoose = require('mongoose')
const validator = require('validator')

const Games = mongoose.model('Games', {
    // "_id" : ObjectId("669c76a328075336c2c191b7"),
    id : {type: Number},
    title : {type: String},
    thumbnail : {type: String},
    shortdescription : {type: String},
    gameurl : {type: String},
    genre : {type: String},
    platform : {type: String},
    publisher : {type: String},
    developer : {type: String},
    releasedate : {type: String},
    freetogameprofile_url : {type: String},
});

module.exports = Games;
