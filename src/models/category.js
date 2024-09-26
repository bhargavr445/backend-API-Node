const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');


const categoryC = taskManagerConnection.model('category', {
    
    code: {type: String, required: true, unique: true},
    type: {type: String},
    // createdOn: {type: Date, default: Date.now}
}, 'category');

module.exports = categoryC;