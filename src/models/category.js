const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');


const categoryC = taskManagerConnection.model('category', {
    
    code: {type: String, required: true, unique: true},
    type: {type: String},
}, 'category');

module.exports = categoryC;