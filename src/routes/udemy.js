const express = require('express');
const router = new express.Router();
const AccountTypesC = require('../models/account-types');
const categoryC = require('../models/category');
const udemyCreateCourseC = require('../models/udemy-course');
const auth = require('../middleware/auth');
const User = require('../models/user');
/**
 * @swagger
 * tags:
 *   name: Udemy
 *   description: API for managing Udemy courses
 */

/**
 * @swagger
 * /api/cat/types:
 *   post:
 *     summary: Create a new category type
 *     tags: [Udemy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Programming"
 *     responses:
 *       200:
 *         description: Category type created successfully
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
router.post('/api/cat/types', async (req, res) => {
    try {
        // console.log(req)
        const payload = req.body;
        // console.log('******',payload);
        // select * from categoryC;
        const records = await categoryC.insertMany([payload]);
        //  return records;
        return res.status(200).send({ data: records, status: 1 })
    } catch (error) {
        return res.status(400).json({ error: error, status: 0 })
    }

});
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Udemy]
 *     responses:
 *       200:
 *         description: A list of categories
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
router.get('/api/categories', auth, (_, res) => {
    categoryC.find(
        {},
       
    )
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});
/**
 * @swagger
 * /api/accountTypes:
 *   get:
 *     summary: Retrieve a list of account types
 *     tags: [Udemy]
 *     responses:
 *       200:
 *         description: A list of account types
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
router.get('/api/accountTypes', (_, res) => {
    AccountTypesC.find({}, { "_id": 0, })
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});

router.get('/api/enrolledCourseCount', (_, res) => {

    User.aggregate([
        {
          $unwind: {
            path: "$enrolledCourses"
          }
        },
        {
          $group: {
            _id: "$enrolledCourses",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]).then((result) => res.status(200).send({ data: result, status: 1 }))
      .catch((error) => res.status(400).json({ error: error, status: 0 }))

});




/**
 * Checks if course id exists, this is useful while creating course
 */
/**
 * @swagger
 * /api/checkIdExists/{id}:
 *   get:
 *     summary: Check if course ID exists
 *     tags: [Udemy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: Course ID existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *       400:
 *         description: Bad request
 */
router.get('/api/checkIdExists/:id', auth, (req, res) => {
    const { id } = req.params;
    udemyCreateCourseC.findOne({ course_id: id })
        .then((result) => {
            const found = !!result;
            return res.status(200).send({ data: found, status: 1 })
        })
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});

/**
 * This is used to create course, but only the profile with instructor can only create this course.
 */
/**
 * @swagger
 * /api/createCourse:
 *   post:
 *     summary: Create a new course
 *     tags: [Udemy]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - course_id
 *               - createrId
 *               - description
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *                 example: "Learn JavaScript"
 *               description:
 *                 type: string
 *                 description: The description of the course
 *                 example: "A comprehensive course on JavaScript"
 *               price:
 *                 type: number
 *                 description: The price of the course
 *                 example: 99.99
 *               category:
 *                 type: string
 *                 description: The category of the course
 *                 example: "Programming"
 *     responses:
 *       200:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 status:
 *                   type: integer
 *       400:
 *         description: Bad request
 */
router.post('/api/createCourse', auth, async (req, res) => {
    try {
        const { user } = req;
        if (user.role !== 'U_INSTRUCTOR') {
            throw new Error('You cannot create course')
        }
        const addCourseResponse = await udemyCreateCourseC.insertMany([{ ...req.body, createrId: user.email }]);
        const updateIdResp = await User.updateOne(
            { userName: user.userName },
            { $push: { yourCourses: addCourseResponse[0].course_id } },
            { upsert: true }
        );
        return res.status(200).send({ data: updateIdResp, status: 1 });
    } catch (error) {
        return res.status(400).json({ error: error, status: 0 })
    }
});

/**
 * Only admin can access this end point
 */
/**
 * @swagger
 * /api/getAllCourses:
 *   get:
 *     summary: Retrieve a list of all courses
 *     tags: [Udemy]
 *     responses:
 *       200:
 *         description: A list of all courses
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
router.get('/api/getAllCourses', (req, res) => {
    // console.log('88888888');
    udemyCreateCourseC.aggregate([
        {
            $lookup: {
                from: "category",
                localField: "categoryType",
                foreignField: "code",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                "categoryType": 0,
                _id: 0,
                "category._id": 0
            }
        }
    ])
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});

/**
 * Returns all the enrolled courses based on the user.
 */
router.get('/api/fetchEnrolledCourses', auth, (req, res) => {
    const { user } = req;
    User.aggregate([
        {
            $match: {
                userName: user.userName
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "enrolledCourses",
                foreignField: "course_id",
                as: "enrolledCourses"
            }
        },
        {
            $unwind: "$enrolledCourses"
        },
        {
            $lookup: {
                from: "category",
                localField: "enrolledCourses.categoryType",
                foreignField: "code",
                as: "enrolledCourses.categoryDetails"
            }
        },
        {
            $unwind: "$enrolledCourses.categoryDetails"
        },
        {
            $replaceRoot: {
                newRoot: "$enrolledCourses"
            }
        }
    ])
        .then((result) => {
            // console.log(result);
            return res.status(200).send({ data: result, status: 1 })
        })
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});


/**
 * Add udemu course by instructor
 */
router.post('/api/categories', (req, res) => {
    const data = req.body;
    const { user } = req;
    udemyCreateCourseC.insertMany([data])
        .then((result) => res.status(200).send({ data: result, status: 1 }))
        .catch((error) => res.status(400).json({ error: error, status: 0 }))
});

router.get('/api/fetchCreatedCourses', auth, async (req, res) => {

    try {
        const { user } = req;
        const createdCoursesList = await User.aggregate([
            {
                $match: {
                    userName: user.userName
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "yourCourses",
                    foreignField: "course_id",
                    as: "createdCourses"
                }
            },
            {
                $project: {
                    _id: 0,
                    createdCourses: 1
                }
            },
            {
                $unwind: "$createdCourses"
            },
            {
                $lookup: {
                    from: "category",
                    localField: "createdCourses.categoryType",
                    foreignField: "code",
                    as: "createdCourses.categorys"
                }
            },
            {
                $unwind: "$createdCourses.categorys"
            },
            {
                $replaceRoot: {
                    newRoot: "$createdCourses"
                }
            }
        ])
        return res.status(200).send({ data: createdCoursesList, status: 1 });
    } catch (error) {
        return res.status(400).json({ error: error, status: 0 })
    }
})

/**
 * When user purchases new course, this end point will update enrolledCourses prop in users obj
 * accepts [course_ids's] in body
 */
router.post('/api/purchaseNewCourses', auth, async (req, res) => {
    try {
        const { user } = req;
        const { body } = req;
        // console.log(body);
        const updateNewCOurseInPurchaseList = await User.updateOne(
            { userName: user.userName },
            {
                $push: {
                    enrolledCourses: {
                        $each: body
                    }
                }
            }
        )
        return res.status(200).send({ data: updateNewCOurseInPurchaseList, status: 1 });
    } catch (error) {
        return res.status(400).json({ error: error, status: 0 })
    }
})

router.get('/api/unEnrolledCourses', auth, async (req, res) => {
    try {
        const { user } = req;
        const updateNewCOurseInPurchaseList = await User.aggregate(
            [
                {
                    $match: {
                        userName: user.userName
                    }
                },
                {
                    $lookup: {
                        from: "courses",
                        let: {
                            enrolledAndCreatedCourses: {
                                $concatArrays: [
                                    {
                                        $ifNull: ["$yourCourses", []]
                                    },
                                    {
                                        $ifNull: ["$enrolledCourses", []]
                                    }
                                ]
                            }
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $not: {
                                            $in: [
                                                "$course_id",
                                                "$$enrolledAndCreatedCourses"
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 0
                                }
                            }
                        ],
                        as: "unEnrolledCourses"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        unEnrolledCourses: 1
                    }
                },
                {
                    $unwind: {
                        path: "$unEnrolledCourses"
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$unEnrolledCourses"
                    }
                }
            ]
        )
        return res.status(200).send({ data: updateNewCOurseInPurchaseList, status: 1 });
    } catch (error) {
        return res.status(400).json({ error: error, status: 0 })
    }
})






module.exports = router;