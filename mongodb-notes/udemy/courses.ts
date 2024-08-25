export interface UserProfile {

}

export interface Instructors {

}

export interface Courses {

}

export interface CourseCategory {

}
db.getCollection("account-type").insertMany([
    {
        id: "U_ADMIN",
        type: "Admin"
    },
    {
        id: "U_STUDENT",
        type: "Student"
    },
    {
        "id" : "U_INSTRUCTOR",
        "type" : "Instructor"
    }
])


db.getCollection("category").insertMany([
    {
        type: "IT",
        code: "U_IT"
    },
    {
        type: "Music",
        code: "U_MUSIC"
    },
    {
        type: "Real Estate",
        code: "U_REAL_ESTATE"
    },
])

db.getCollection("courses").insertMany([
    {
      "course_id": "course_003",
      "title": "NgRx",
      "description": "Master NgRx, the popular state management library for Angular.",
      "price": 11.99,
      "categoryType": "U_IT"
    }, 
    {
      
      "course_id": "course_009",
      "title": "MongoDB",
      "description": "Learn MongoDB, the popular NoSQL database. This course covers data modeling.",
      "price": 10.49,
      categoryType: "U_IT"
    }
]);