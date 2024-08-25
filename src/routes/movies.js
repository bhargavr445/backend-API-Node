const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const MoviesDB = require('../models/movies');

router.get('/api/movies', async (_, res) => {
    MoviesDB.find({}).then(
        (result) => res.status(200).send({ data: result, status: 1 })
    ).catch(
        (error) => res.status(400).json({ error: error, status: 0 })
    )
});

router.get('/api/moviesCountWithGeneras', (_, res) => {
    MoviesDB.aggregate([
        {
            $group: { _id: { type: "$type" }, count: { $sum: 1 } }
        },
        {
            $sort: { count: -1 }
        },
        {
            $project: {
                _id: 0,
                type: "$_id.type",
                count: 1
            }
        }
    ])
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});

module.exports = router;