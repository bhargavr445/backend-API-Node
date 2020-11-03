const express = require('express');
const router = new express.Router();
const CompletedCourses = require('../models/courses');
const auth = require('../middleware/auth');



router.get('/api/getAllCompletedCourses', (req, res) => {
    CompletedCourses.find({}).then((result) => {
        return res.status(200).send({ data: result, status: 1 });
    }).catch((err) => {
        return res.status(400).json({ error: error, status: 0 })
    });
});

router.post('/api/courses', (req, res) => {
    const completedCourses = new CompletedCourses(req.body);
    completedCourses.save().then((resp) => {
        let resp1 = new CompletedCourses();
        resp1 = resp;
        return res.status(200).send({ data: resp1.studentId, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ data: error.message, status: 0 });
    });
});

module.exports = router;