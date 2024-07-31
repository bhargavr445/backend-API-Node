brew services start mongodb-community@7.0
mongosh
showdbs

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


# Update 
$set - will update only the props that we send. if prop doesnt exist then it will add new prop(same like ... operator)

We can update multiple fields at same time. 

# updateOne({id: 10}, {$set: {hobbies: ['Playing','Gaming','Movies']}) - takes filter and update 1st matching record.

# updateMany({name: 10}, {$set: {hobbies: ['Playing','Gaming','Movies']}}) - takes filter and update all matching records. 

# $inc 
updateOne({name: 'Bhargav'}, {$inc: {age: 1}}) ✅

updateOne({name: 'Bhargav'}, {$inc: {age: 1}, $set:{age: 30}}) ❌ we cannot perform this. 

updateOne({name: 'Bhargav'}, {$inc: {age: 1}, $set:{domain: 'React'}}) ✅


