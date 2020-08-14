const express = require('express');
const router = new express.Router();
const Student = require('../models/student');

// this is to get student based on ID.
router.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Student.findOne({studentId: id}).then((result)=>{
        return res.status(200).send({data:result, status: 1});
    }).catch((error)=>{
        res.status(500).send({erroe: error.message, status: 0});
    });
});

//this is return all students
router.get('/api/student', (req, res)=> {
    Student.find({}).then((result)=>{
        // console.log(result);
        return res.status(200).send({data: result, status: 1});
    }).catch((err)=>{
        // console.log(err);
        return res.status(400).json({error:error, status: 0})
    });
});

//this will return all ids.
router.get('/api/getAllIds', (req, res) => {
    Student.distinct('studentId').then((result)=>{
        return res.status(200).json({data:result, status: 1})
    }).catch((error)=>{
        return res.status(400).json({error:error, status: 0})
    });
});

//this will create student
router.post('/api/student', (req, res) => {
    const student = new Student(req.body);
    //console.log(student);
    student.save().then((resp)=> {
        let resp1 = new Student();
        // console.log(resp);
        return res.status(200).send({data:resp1.studentId, status: 1});
    }).catch((error)=> {
        // console.log(error);
        res.status(500).send({erroe: error.message, status: 0});
    });
});

module.exports = router;
