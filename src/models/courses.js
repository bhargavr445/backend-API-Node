const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');

const CompletedCourses = taskManagerConnection.model('CompletedCourses', {
    studentName: { type: String },
    studentId: { type: String },
    course: { type: String },
    completedYear: { type: Number },
    term: { type: String },
}
);

module.exports = CompletedCourses;