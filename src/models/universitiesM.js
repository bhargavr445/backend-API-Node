const mongoose = require('mongoose');
const validator = require('validator');
const { localDSchemas } = require('../db/mongoose');


const UniversitiesDB = localDSchemas.model('universities', {

    alpha_two_code: { type: String },
    web_pages: { type: [String] },
    country: { type: String },
    domains: { type: [String] },
    name: { type: String },
    state_province: { type: String }

})
module.exports = UniversitiesDB;
