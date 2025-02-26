const express = require('express');
const router = new express.Router();
const kafka = require("node-rdkafka");


const stream = kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
},
    {},
    { topic: 'cricket_scores' });


router.post('/api/updateScore', (req, res) => {
    console.log(req.body);
    const result = stream.write(Buffer.from(JSON.stringify(req.body)));
    return res.status(200).send({ data: result, status: 1 });
});

module.exports = router;
