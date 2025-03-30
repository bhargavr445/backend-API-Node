const validator = require('validator')
const { atlasMongoConnection } = require('../db/mongoose');


const categoryC = atlasMongoConnection.model('category', {
    
    code: {type: String, required: true, unique: true},
    type: {type: String},
    // createdOn: {type: Date, default: Date.now}
}, 'category');

module.exports = categoryC;