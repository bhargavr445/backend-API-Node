const mongoose = require('mongoose')
const validator = require('validator')

const Student = mongoose.model('Student', {
    studentName: { type: String },
    studentId: { type: String },
    studentPhoneNumber: { type: String },
    course: { type: String },
    year: { type: Number },
    country: { type: String },
    // timestamps: { createdAt: 'created_at' }
    // createdOn: {type: Date}

});

module.exports = Student;