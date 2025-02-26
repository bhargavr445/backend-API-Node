const express = require('express');
const router = new express.Router();
const Customer = require('../models/customer');

router.post('/api/customer', (req, res) => {
    const customer = new Customer(req.body);
    customer.save().then((resp) => {
        let resp1 = new Customer();
        resp1 = resp;
        return res.status(200).send({ data: resp1.customerId, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ data: error.message, status: 0 });
    });
});

router.get('/api/customer', (req, res) => {
    Customer.find({}).then((result) => {
        return res.status(200).send({ data: result, status: 1 });
    }).catch((err) => {
        return res.status(400).json({ error: error, status: 0 });
    });
});

router.get('/api/customer/:id', (req, res) => {
    const id = req.params.id;
    Customer.findOne({ customerId: id }).then((result) => {
        return res.status(200).send({ data: result, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ data: error.message, status: 0 });
    });
});

router.put('/api/customer', (req, res) => {
    const customer = new Customer(req.body);
    console.log(customer);
    Customer.findByIdAndUpdate(customer._id, customer).then((resp) => {
        let resp1 = new Customer();
        resp1 = resp;
        return res.status(200).send({ data: `${resp1.customerId} has been updated sucessfully`, status: 1 });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send({ data: err, status: 0 });
    });
});

router.delete('/api/customer', (req, res) => {
    // console.log(req);
    // console.log(res);
    return 'total amount';
});

module.exports = router;
