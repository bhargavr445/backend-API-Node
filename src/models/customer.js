const validator = require('validator')
const { localDSchemas } = require('../db/mongoose');

const Customer = localDSchemas.model('Customer', {
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