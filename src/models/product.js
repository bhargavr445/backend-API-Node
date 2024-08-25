const mongoose = require('mongoose')
const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');

const Product = taskManagerConnection.model('Product', {
    productId: {type: String},
    productName: {type: String},
    productAvailableCountrys: {type: [String]}
});

module.exports = Product;