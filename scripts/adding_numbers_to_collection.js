"use strict";

db = connect("localhost:27017/nosql_workshop");

let id1 = new ObjectId();
let id2 = new ObjectId();

let numbers = [
    {
        "_id": id1,
        "val" : 2.1, 
        "description" : "Decimal"
    },
    {
        "_id": id2,
        "val": 3.1,
        "description" : "Decimal"
    }
];

db.numbers.insertMany(numbers);

let num1 = db.numbers.find({
    _id: id1
})[0].val;

print(num1);