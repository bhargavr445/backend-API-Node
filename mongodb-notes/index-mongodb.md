# import json file as below.
navigate to where the file is and run below cmd
mongoimport persons.json -d task-manager-api -c persons --jsonArray

# get execution stats
db.getCollection("persons").explain("executionStats").find({});

# single row index 
# compound indexes - apply index on max 31 props 
# unique indexes
# partial indexes 
# Text index
# **TTL Time-To-Live**
# **Multi key Indexes**

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
db.getCollection("persons").createIndex({"dob.age": 1}, {**partialFilterExpression**: {gender: "male"}});
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

# Text Index
`We can apply this indexes on description fields. THis will create text as array of strings by avoiding few words like (is and or the then etc...)`
 db.getCollection("persons").createIndex({"description: "text"})

 db.getCollection("persons").find({$text: {$search: "awesome"}})
`We are not mentioning description in find query because we will apply text index only on 1 field, so MongoDB will perform this text search only on that col. FOr this reasln we dont have to mention on which field we need to search`

 db.getCollection("persons").find({$text: {$search: "red book"}})
 `Aove query will return data which has red or book words in the documents`

 db.getCollection("persons").find({$text: {$search: "\"red book\""}}) 
 `this wull search for red book phrase, but not for red or book`

 db.getCollection("persons").find({$text: {$search: "awesome t-shirt"}})
 `this will return 2 records, but in 1st record i have only awesome and in 2nd record I have awesome t-shirt, but now i need 2nd record to be in the 1st place, because it has lot of matching data.`

[case-sensitive]
  db.getCollection("persons").find({$text: {$search: "awesome t-shirt", $caseSensitive: true}})

  db.getCollection("persons").find({$text: {$search: "awesome t-shirt"}}, {score: {$meta: "textScore"}});
  `this query will generate score based in the matching data(in output we can see score prop for each record) and sot records based on the score `
  `so the above query will make sure to have awesome t-shirt 1st and awesome record 2nd`.
  `Here in the query we applied score projection and this will sort according to the matching score`
 **This above query should sort data based on the $meta, but not sorting so I wrote below query to sort** 

  db.getCollection("games").find({$text: {$search: "modern first"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}}).count();
`this will sort the filtered records based on the matching score.`

 # [combined-text-index] - this is part of text indexes
 we can combine 2 or more fields to create combined text indexes
 db.getCollection("persons").createIndex({"description: "text", "summary": "text"});

 # [Exclude-words] - we can aslo specify words that shouldn't include the text search
 db.getCollection("persons").find({$text: {$search: "awesome -t-shirt"}});
 **here `-` t-shirt is the word we are excluding from the text search. So it will not return records with awesome and without t-shirt**

 # [weights-on-multi-field-text-indexes] - by applying these weights, we candefine which field text match should weigh more, so that score will be increased accordingly.
 **We can also add language, but by default language is english, based on the language it will remove regular words**
  db.getCollection("persons").createIndex({"description: "text", "summary": "text"}, {weights: {"description: 1, "summary": 10}});
  `if the search string finds from summary col score will be ten times more, when compared to the string is found in description.`

  [Foreground-and--Background]: According to my understanding if we try to create index and parallely if we try to insert/update records in collection then this updation process will not complete untill createIndex completes in foregroung. So we need to use Background

**`Foreground Operation`: When you create an index in the foreground, it locks the collection. This means that all other operations (insert, update, delete) are  blocked until the index creation is complete.**
**`NOTE`: Foreground indexing is generally faster than background indexing because it doesn't have to juggle ongoing operations.**
`Practical Considerations:`
`Foreground Index Creation`: Suitable for scenarios where the collection can be taken offline or locked temporarily without impacting the application.
`Background Index Creation`: Suitable for live applications where downtime or locking the collection is not acceptable.


 # Dropping title index:
 db.getCollection("persons").dropIndex("short_description_text");
 # `i found this index name` [short_description_text] `from getIndexes() method`
===============================================================================================================================

 # Multi-key indexes: can apply indexes on Arrays with premetive data types and also on custom data types(Objects)

    [
            {
                name: "Bhargav",
                hobbies: [
                    'Cricket',
                    "Video Games",
                    "TV Series"
                ],

                address: [
                    {street: "Main Street"},
                    {street: "Second Street"},
                ]
            }
        ]
# we can apply indexes on hobbies, address and also on address.street, but not on all. 

We **`cannot`** apply index on `hobbies and address`, but we `can apply` indexes on `name and hobbies` or `name and address`

createIndex({hobbies:1})
find({"hobbies": "Cricket"}) `Index scan`
createIndex({address:1})
find({"address": {street: "Main Street"}}) - `Index Scan`
find({"address.street":  "Main Street"}) -  `Col Scan`  

createIndex({address.street:1})
 find({"address.street":  "Main Street"}) -  `Index Scan`  







