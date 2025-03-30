const validator = require('validator')
const { atlasMongoConnection } = require('../db/mongoose');

const CompletedCourses = atlasMongoConnection.model('CompletedCourses', {
    studentName: { type: String },
    studentId: { type: String },
    course: { type: String },
    completedYear: { type: Number },
    term: { type: String },
}
);

module.exports = CompletedCourses;