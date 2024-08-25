const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const LearnersM = require('../models/learners');


router.get('/api/enrolledCourses', (req, res) => {
    const { email } = req;
    LearnersM.aggregate([
        {
            $match: {
                userName: "bhargav@gmail.com"
            }
        },
        {
            $lookup: {
                "from": "courses",
                "localField": "purchasedCourses",
                "foreignField": "_id",
                as: "enrolledCourses"
            }
        },
        {
            $unwind: "$enrolledCourses"
        },
        {
            $replaceRoot: {
                newRoot: "$enrolledCourses"
            }
        }
    ]).then(
        (result) => res.status(200).send({ data: result, status: 1 })
    ).catch(
        (error) => res.status(400).json({ error: error, status: 0 })
    )

});

router.post('/api/buyCourses', (req, res) => {


    

});


module.exports = router;