const mongoose = require('mongoose')
const validator = require('validator')

const Customer = mongoose.model('Customer', {
    customerId: { type: String, unique: true },
    customerName: { type: String },
    products: {
        type: [
            {
                productId: { type: String },
                productName: { type: String },
                productAvailableCountrys: { type: [String] }
            }
        ]
    }
});

module.exports = Customer;