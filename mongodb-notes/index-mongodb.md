# import json file as below.
navigate to where the file is and run below cmd
mongoimport persons.json -d task-manager-api -c persons --jsonArray

# get execution stats
db.getCollection("persons").explain("executionStats").find({});

# single row index
# compound indexes - apply index on max 31 props 
# unique indexes
# partial indexes 

===============================================================================================================================
# single row index
db.getCollection("persons").createIndex({"name.first": -1});
`Applying index on signle prop`
===============================================================================================================================
# compound indexes - `we can apply indexes to multiple fields, we need to filter from left index prop to right index prop to take advantage of this index`
`Ex- In the below example i created index on age and gender, so indexes will always works only if we use both props to search or use only left index prop to take advantage of indexes`
db.getCollection("persons").createIndex({"dob.age": 1, gender: 1});

db.getCollection("persons").find({"dob.age": {$gt:30}, gender: "male"}); ✅ [index-works]
db.getCollection("persons").find({"dob.age": {$gt:30}}); ✅ [index-works]
`Below example will not take advantage of indexes, because we are ignoring the left index props`
db.getCollection("persons").find({gender: "male"}); ❌ [index-will-not-work]

db.getCollection("persons").`createIndex`({"dob.age": 1, gender: 1, email: 1});
`Below example will take advantage of indexes, because we are applying from left to right`
db.getCollection("persons").find({"dob.age": {$gt:30}, gender: "male"});✅ 
===============================================================================================================================
# unique indexes
[db.getCollection("persons").createIndex({"emial":1},{unique:true})];
`Above example will make sure that email fields will not have duplicate emails`
===============================================================================================================================
# partial indexes:
db.getCollection("persons").createIndex({"dob.age": 1}, {partialFilterExpression: {gender: "male"}});
`Above query will add indexes to age prop but only to the male documents`. 

db.getCollection("persons").explain().find({"dob.age": {$gt: 60}}); ❌ [index-will-not-work]
`Above query is col scan because above query will fetch all male and femail docs whose age is above 60`.

db.getCollection("persons").explain().find({"dob.age": {$gt: 60}, {"gender":"male"}});  ✅ [index-works]

[ANOTHER_USE_CASE]: 
db.getCollection("persons").createIndex({"emial":1},{unique:true})
db.getCollection('us').insertMany([
    {"name":"Bhargav", email: "Bhargav@gmail.com"},
    {"name":"Neeru"},
    {"name":"Phani"}
])
`if we try to add two records without email, then unique condition will fail, because Mongo condider 2 docs with no email as same`

we can fix above issue by using partialFilterExpression
db.getCollection("persons").createIndex({"emial":1},{unique:true, partialFilterExpression: {email: {$exists: true}}})
`above query will add index to emails fields only for the docs which has email field`
===============================================================================================================================




