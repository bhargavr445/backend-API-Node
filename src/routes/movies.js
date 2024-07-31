const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const MoviesDB = require('../models/movies');

router.get('/api/movies', async (req, res) => {
    MoviesDB.find({}).then(
        (result) => res.status(200).send({ data: result, status: 1 })
    ).catch(
        (error) => res.status(400).json({ error: error, status: 0 })
    )
})

module.exports = router;