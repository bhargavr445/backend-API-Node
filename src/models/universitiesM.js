const mongoose = require('mongoose');
const validator = require('validator');

const UniversitiesDB = mongoose.model('universities', {

    alphaTwoCode: { type: String },
    web_pages: { type: [String] },
    country: { type: String },
    domains: { type: [String] },
    name: { type: String },
    state_province: { type: String }

})
module.exports = UniversitiesDB;
