const mongoose = require('mongoose')
const validator = require('validator');
const { taskManagerConnection } = require('../db/mongoose');


const Student = taskManagerConnection.model('Student', {
    studentName: { type: String },
    studentId: { type: String, unique: true },
    studentPhoneNumber: { type: String },
    course: { type: String },
    year: { type: Number },
    country: { type: String },
    // timestamps: { createdAt: 'created_at' }
    // createdOn: {type: Date, default: Date.now },

}
// , {
//     timestamps: true
// }
);

module.exports = Student;