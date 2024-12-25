const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const UniversitiesDB = require('../models/universitiesM');

/**
 * @swagger
 * tags:
 *   name: Universities
 *   description: API for managing universities
 */

/**
 * @swagger
 * /api/universities:
 *   get:
 *     summary: Retrieve a list of universities
 *     tags: [Universities]
 *     parameters:
 *       - in: query
 *         name: alphaTwoCode
 *         schema:
 *           type: string
 *         description: The alpha two code of the country
 *     responses:
 *       200:
 *         description: A list of universities
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
router.get('/api/universities', (req, res) => {
    const { alphaTwoCode } = req.query;
    UniversitiesDB.find(alphaTwoCode ? { alpha_two_code: alphaTwoCode } : {})
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }));
});

/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Retrieve university information
 *     tags: [Universities]
 *     responses:
 *       200:
 *         description: University information
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
router.get('/api/info', (_, res) => {
    UniversitiesDB.aggregate([
        {
            $group: {
                _id: { countryCode: "$alpha_two_code" },
                total: { $sum: 1 },
                country: { $first: "$country" }
            }
        },
        {
            $sort: { total: -1 }
        },
        {
            $project: { total: 1, countryCode: "$_id.countryCode", country: 1, _id: 0 }
        }
    ])
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }));
});

/**
 * @swagger
 * /api/countrys:
 *   get:
 *     summary: Retrieve a list of countries
 *     tags: [Universities]
 *     responses:
 *       200:
 *         description: A list of countries
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
router.get('/api/countrys', (_, res) => {
    UniversitiesDB.aggregate([
        {
            $group: {
                _id: {
                    country: "$country",
                    alphaTwoCode: "$alpha_two_code"
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
        .catch((error) => res.status(400).json({ error: error, status: 0 }));
});

module.exports = router;