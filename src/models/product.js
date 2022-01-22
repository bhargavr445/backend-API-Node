const mongoose = require('mongoose')
const validator = require('validator')

const Product = mongoose.model('Product', {
    productId: {type: String},
    productName: {type: String},
    productAvailableCountrys: {type: [String]}
});

module.exports = Product;