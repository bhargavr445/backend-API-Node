const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const UniversitiesDB = require('../models/universitiesM');

router.get('/api/universities/:alphaTwoCode', (req, res) => {
    const {alphaTwoCode} = req.params;
    UniversitiesDB.find(alphaTwoCode ? {country:alphaTwoCode} : {})
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});

router.get('/api/countrys', (_, res) => {
    UniversitiesDB.aggregate([
        {
            $group: {
                _id: {
                    country: "$country",
                    alphaTwoCode: "$alphaTwoCode"
                }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id.country",
                code: "$_id.alphaTwoCode"
            }
        },
        {
            $sort: {
                name: 1
            }
        }
    ])
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))

});

module.exports = router;
