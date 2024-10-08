const mongoose = require('mongoose');
const validator = require('validator');
const { taskManagerConnection } = require('../db/mongoose');


const UniversitiesDB = taskManagerConnection.model('universities', {

    alpha_two_code: { type: String },
    web_pages: { type: [String] },
    country: { type: String },
    domains: { type: [String] },
    name: { type: String },
    state_province: { type: String }

})
module.exports = UniversitiesDB;
