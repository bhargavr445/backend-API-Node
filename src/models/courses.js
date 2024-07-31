const mongoose = require('mongoose')
const validator = require('validator')

const CompletedCourses = mongoose.model('CompletedCourses', {
    studentName: { type: String },
    studentId: { type: String },
    course: { type: String },
    completedYear: { type: Number },
    term: { type: String },
}
);

module.exports = CompletedCourses;