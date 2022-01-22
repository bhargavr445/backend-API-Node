const express = require('express');
const router = new express.Router();
const Customer = require('../models/customer');

router.post('/api/customer', (req, res)=> {
    const customer = new Customer(req.body);
        customer.save().then((resp) => {
        let resp1 = new Customer();
        resp1 = resp;
        return res.status(200).send({ data: resp1.customerId, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ data: error.message, status: 0 });
    });

});

module.exports = router;