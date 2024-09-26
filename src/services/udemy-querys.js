const User = require('../models/user');

const fetchUnEnrolledCourses = async (user) => {
    return await User.aggregate([
        {
            $match: {
                userName: user.userName
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "yourCourses",
                foreignField: "course_id",
                as: "createdCourses"
            }
        },
        {
            $project: {
                _id: 0,
                createdCourses: 1
            }
        },
        {
            $unwind: "$createdCourses"
        },
        {
            $lookup: {
                from: "category",
                localField: "createdCourses.categoryType",
                foreignField: "code",
                as: "createdCourses.categorys"
            }
        },
        {
            $unwind: "$createdCourses.categorys"
        },
        {
            $replaceRoot: {
                newRoot: "$createdCourses"
            }
        }
    ])
}

module.exports = fetchUnEnrolledCourses;