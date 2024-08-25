const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');

const AccountTypesC = taskManagerConnection.model('accounttype', {
    id: {type: String},
    type: {type: String},
}, 'accountType');

module.exports = AccountTypesC;