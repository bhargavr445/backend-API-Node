const mongoose = require('mongoose')
const validator = require('validator')

const LearnersM = mongoose.model('Learners', {
    name: { type: String, unique: true },
    userName: { type: String, unique: true },
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "courses"}]
})
module.exports = LearnersM;