# Update 
$set - will update only the props that we send. if prop doesnt exist then it will add new prop(same like ... operator)

We can update multiple fields at same time. 

# updateOne({id: 10}, {$set: {hobbies: ['Playing','Gaming','Movies']}) - takes filter and update 1st matching record.

# updateMany({name: 10}, {$set: {hobbies: ['Playing','Gaming','Movies']}}) - takes filter and update all matching records. 

# $inc 
updateOne({name: 'Bhargav'}, {$inc: {age: 1}}) ✅

updateOne({name: 'Bhargav'}, {
    $inc: {age: 1}, 
    $set:{age: 30}
    }) ❌ we cannot perform this. cannot use same prop in $inc and $set 

updateOne({name: 'Bhargav'}, {$inc: {age: 1}, $set:{domain: 'React'}}) ✅ 


updateOne({name: 'Bhargav'}, {$min: {age: 35}) - updates record whose name is Bhargav to age 35 if age is >35

# $rename - will rename the prop in document


# $unset will delete prop in the document 

# $rename - is to rename props. 
db.getCollection("me").updateMany({}, {
    $rename: {
        "name": "firstName",
        "hobbies": "timePass"
    }
}
)

# $upsert
will update doc like spread operator. 

# pushing 1 course id into purchasedCourses array of strings by using `$push`
db.getCollection("learners").updateMany(
    {
        name: "bhargav"
    },
    {
        $push: {
          "purchasedCourses": ObjectId("66b4fa6c57214c018ac191b8")  
        }
    }
)
# pushing multiple  course id's into purchasedCourses array of strings by using `$each`
db.users.updateOne(
  { _id: ObjectId("60c72b2f9f1b2c6d88f789f1") },
  {
    $push: {
      purchasedCourses: {
        $each: [
          12345,
          89108
        ]
      }
    }
  }
);
# updating data in array of objects. Adding new prop in matching first obj in Array
db.getCollection("me").updateMany({
    "hobbies": {
        $elemMatch: {
            "title": "Running",
            "frequency": { $gte: 3 }
        }
    }
},
    {
        $set: {
            "hobbies.$.isPro": 10
        }
    }
);


# updating one object into products array for Bhargav R G
db.getCollection("customers").updateOne(
    { name: "Bhargav R G" },
    {
        $push: {
            products: {
                pId: "ap190",
                productName: "Apple"
            }
        }
    });

# adding new prop in each object in products array \
db.getCollection("customers").updateMany(
    {
        name: "Prasanth"
    },
    {
        $set: {
            "products.$[].noOfItems": 1
        }
    }
)
# updating all records in array for Bhargav Doc **(above query and this is same)
db.getCollection("me").updateMany({"name":"Bhargav"}, {$inc: {"hobbies.$[].frequency": 1}})

# updating noOfitems prop in array of objects(in one obj) based on the pId
db.getCollection("customers").updateOne(
    {
        name: "Prasanth"
    },
    {
        $set: {
            "products.$[el].noOfItems": 2
        }
    },
    {
        arrayFilters: [
            {"el.pId": "sm101"}
        ]
    }
)







 
  
  db.getCollection("customers").update(
  {
    $and: [
      { name: "Bhargav R G" },
      { "products.pId": "xc101" }
    ]
  },
  {
    $set: {
      "products.$.noOfItems": 4
    }
  }
);


# adding new item to products array 
we can also use addTOSet(this will make sure unique object is adding to list or it will not perform operation)
db.getCollection("customers").updateMany(
    {
        name: "Prasanth"
    },
    {
        $push: {
            products: {
                Id: "m1mac",
                productName: "Mac Book Pro 14 inch"
            }
        }
    }
);