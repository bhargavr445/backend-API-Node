const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const GamesI = require('../models/games');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API for managing games
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Retrieve a list of games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: integer
 *       400:
 *         description: Bad request
 */
router.get('/api/games', async (req, res) => {
try{
    const result =  await GamesI.find({});
    return res.status(200).send({ data: result, status: 1 })
} catch(error) {
    return res.status(400).json({ error: error, status: 0 })
}
    
    // GamesI.find({}).then(
    //     (result) => res.status(200).send({ data: result, status: 1 })
    // ).catch(
    //     (error) => res.status(400).json({ error: error, status: 0 })
    // )
})

module.exports = router;

