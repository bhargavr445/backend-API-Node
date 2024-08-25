const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');


const UdemyCourseM = taskManagerConnection.model('courses', {

  course_id: { type: String, required: true, trim: true, unique: true },
  createrId: {type: String, ref: 'User' },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  categoryType: { type: String }
}, 'courses');

module.exports = UdemyCourseM;

// @table('courses')
// class UdemyCourses {


//   @column(course_id)
//   courseId

// }