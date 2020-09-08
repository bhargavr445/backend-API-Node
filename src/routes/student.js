const express = require('express');
const router = new express.Router();
const Student = require('../models/student');
const auth = require('../middleware/auth');




// this is to get student based on ID.
router.get('/api/student/:id',auth, (req, res) => {
    const id = req.params.id;
    Student.findOne({ studentId: id }).then((result) => {
        return res.status(200).send({ data: result, status: 1 });
    }).catch((error) => {
        return res.status(500).send({ erroe: error.message, status: 0 });
    });
});

//this is return all students
router.get('/api/student',auth, (req, res) => {
    Student.find({}).then((result) => {
        // console.log(result);
        return res.status(200).send({ data: result, status: 1 });
    }).catch((err) => {
        // console.log(err);
        return res.status(400).json({ error: error, status: 0 })
    });
});

//this will return all ids.
router.get('/api/getAllIds',auth, (req, res) => {
    Student.distinct('studentId').then((result) => {
        return res.status(200).json({ data: result, status: 1 });
    }).catch((error) => {
        return res.status(400).json({ error: error, status: 0 });
    });
});

//this will create student.
router.post('/api/student',auth, (req, res) => {
    const student = new Student(req.body);
    //console.log(student);
    student.save().then((resp) => {
        let resp1 = new Student();
        //console.log(resp1);
        resp1 = resp;
        return res.status(200).send({ data: resp1.studentId, status: 1 });
    }).catch((error) => {
        // console.log(error);
        return res.status(500).send({ erroe: error.message, status: 0 });
    });
});

router.put('/api/student',auth, (req, res) => {
    console.log(req.body);
    const stu = new Student(req.body);
    Student.findByIdAndUpdate(stu.studentId, stu).then(resp => {
        return res.status(200).send({ data: resp, status: 1 });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send({ error: err, status: 0 });
    });
});

router.delete('/api/student/:id',auth, (req, res) => {
    const id = req.params.id;
    Student.deleteOne({ studentId: { $in: id } }).then(resp => {
        return res.status(200).send({ data: resp, status: 1 });
    }).catch(err => {
        return res.status(500).send({ data: err, status: 0 });
    })
})

module.exports = router;
