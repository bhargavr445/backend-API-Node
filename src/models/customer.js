const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');

const Customer = taskManagerConnection.model('Customer', {
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