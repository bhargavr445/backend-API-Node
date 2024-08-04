db.getCollection("movies").find({
    $or: [
        {"runtime": {$lt: 60}},
        {"runtime": {$gt: 60}},
        {"runtime": {$eq: 60}}
    ]
}).count();

db.getCollection("movies").find({}).count();


db.getCollection("movies").find({"runtime": {$gt: 90}}).toArray();

db.getCollection("movies").find({"runtime": {$eq: 60}}, {"runtime": 1}).toArray();

db.getCollection("movies").find({"schedule.days": "Tuesday"}).count();

db.getCollection("movies").find({"schedule.days": ["Tuesday"]}).count();

db.getCollection("boxoffice").find({})


db.getCollection("boxoffice").find({
    $and: [
        {"meta.runtime": {$lt: 100}},
        {"meta.rating": {$gt: 9.2}}
    ]
}).toArray();

db.getCollection("boxoffice").find({
    $or: [
        {"genre": "drama"},
        {"genre": "action"},
    ]
}).toArray();


db.getCollection("boxoffice").find({
    $expr: {
        $gt: ["$visitors", "$expectedVisitors"]
    }
})


db.getCollection("boxoffice").find({
    "title": {$regex: /Teach/}
})
####  QUERYING ARRAYS ####
# Querying Array of object 
[
    {
        name: "Bhargav",
        hobbies: [
            {
                title: "sports",
                frequency: 3
            },
            {
                title: "Running",
                frequency: 4
            }
        ]
    },
    {
        name: "Bhargav",
        hobbies: [
            {
                title: "Cricket",
                frequency: 4
            },
            {
                title: "sports",
                frequency: 3
            }
        ]
    }
]

.find({"hobbies.title": "sports"})
## above query will go through each and every obj in array and check if hobbies is sports and return all the matching docs. 
.find({"hobbies.title": "sports"})

# $size - will return the docs if length of the array matches
.find({hobbies: {$size: 3}}) - we cannot write $gt3, $lt3 ... this is still not supported by MongoDB.

# $all - find({hobbies: {$all: ["Cricket", "sports"]}})
{
    name: "Bhargav",
        hobbies: [
             "Cricket",
             "sports"
        ]
}
# $all will give all the matching records, order doesnt match when we use $all
We cannot apply $all on array of objects, it should be only with array of strings and numbers. 

# $elementMatch 
.find({
    "hobbies": {
        $elemMatch: {
            "title": "Cricket",
            "frequency": { $gte: 3 }
        }
    }
}).toArray();