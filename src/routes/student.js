const express = require('express');
const router = new express.Router();
const Student = require('../models/student');

router.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Student.findOne({studentId: id}).then((result)=>{
        return res.status(200).send({data:result, status: 1});
    }).catch((error)=>{
        res.status(500).send({erroe: error.message, status: 0});
    });
});

router.get('/api/student', (req, res)=> {
    Student.find({}).then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/api/getAllIds', (req, res) => {
    Student.distinct('studentId').then((result)=>{
        return res.status(200).json({data:result, status: 1})
    }).catch((error)=>{
        return res.status(400).json({error:error, status: 1})
    });
});

router.post('/api/student', (req, res) => {
    const student = new Student(req.body);
    //console.log(student);
    student.save().then((resp)=> {
        console.log(resp);
        return res.status(200).send({data:resp, status: 1});
    }).catch((error)=> {
        console.log(error);
        res.status(500).send({erroe: error.message, status: 0});
    });
});

module.exports = router;