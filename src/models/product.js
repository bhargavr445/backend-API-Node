const mongoose = require('mongoose')
const validator = require('validator')
const { localDSchemas } = require('../db/mongoose');

const Product = localDSchemas.model('Product', {
    productId: {type: String},
    productName: {type: String},
    productAvailableCountrys: {type: [String]}
});

module.exports = Product;