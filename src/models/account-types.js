const validator = require('validator')
const { atlasMongoConnection } = require('../db/mongoose');

const AccountTypesC = atlasMongoConnection.model('accounttype', {
    id: {type: String},
    type: {type: String},
}, 'accountType');

module.exports = AccountTypesC;