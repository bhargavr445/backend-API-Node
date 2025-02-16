const express = require('express');
const router = new express.Router();
const Student = require('../models/student');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students
 */

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: Student data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 status:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
// this is to get student based on ID.
router.get('/api/student/:id', auth, (req, res) => {
    const id = req.params.id;
    Student.findOne({ studentId: id }).then((result) => {
        return res.status(200).send({ data: result, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ data: error.message, status: 0 });
    });
});

//this is return all students
/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
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
router.get('/api/student', (req, res) => {
    Student.find({}).then((result) => {
        return res.status(200).send({ data: result, status: 1 });
    }).catch((err) => {
        return res.status(400).json({ error: err, status: 0 })
    });
});

//this will return all ids.
/**
 * @swagger
 * /api/getAllIds:
 *   get:
 *     summary: Retrieve a list of all student IDs
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of student IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                 status:
 *                   type: integer
 *       400:
 *         description: Bad request
 */
router.get('/api/getAllIds', auth, (req, res) => {
    Student.
    Student.distinct('studentId').then((result) => {
        return res.status(200).json({ data: result, status: 1 });
    }).catch((error) => {
        return res.status(400).json({ error: error, status: 0 });
    });
});

//this will create student.
/**
 * @swagger
 * /api/student:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *               studentId:
 *                 type: string
 *               year:
 *                 type: number
 *               studentPhoneNumber:
 *                 type: string
 *               course:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                 status:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/api/student', (req, res) => {
    const student = new Student(req.body);
    student.save().then((resp) => {
        let resp1 = new Student();
        resp1 = resp;
        return res.status(200).send({ data: resp1.studentId, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ data: error.message, status: 0 });
    });
});

/**
 * @swagger
 * /api/student:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               studentName:
 *                 type: string
 *               studentId:
 *                 type: string
 *               year:
 *                 type: number
 *               studentPhoneNumber:
 *                 type: string
 *               course:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 status:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.put('/api/student', auth, (req, res) => {
    const stu = new Student(req.body);
    console.log('1111111',stu);
    Student.findByIdAndUpdate(stu._id, stu).then(resp => {
        console.log('22222',resp);
        let resp1 = new Student();
        resp1 = resp;
        if(resp1) {
            return res.status(200).send({ data: 'Updated Sucessfully', status: 1 });
        } else {
            return res.status(200).send({ data: 'Updated Failed Please snd new obj', status: 1 })
        }
    }).catch((err) => {
        return res.status(500).send({ data: err, status: 0 });
    });
});

router.delete('/api/student/:id', auth, (req, res) => {
    const id = req.params.id;
    Student.deleteOne({ studentId: { $in: id } }).then(resp => {
        return res.status(200).send({ data: resp, status: 1 });
    }).catch(err => {
        return res.status(500).send({ data: err, status: 0 });
    })
});

module.exports = router;
