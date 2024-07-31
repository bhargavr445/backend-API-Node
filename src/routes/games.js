const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const GamesI = require('../models/games');

router.get('/api/games', async (req, res) => {
    GamesI.find({}).then(
        (result) => res.status(200).send({ data: result, status: 1 })
    ).catch(
        (error) => res.status(400).json({ error: error, status: 0 })
    )
})

module.exports = router;

