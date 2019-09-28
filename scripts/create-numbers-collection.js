"use strict";

var db = connect("localhost:27017/nosql_workshop");

load('./scripts/load-numbers.js')

db.numbers.remove({});

numbers.map(number => {
    db.numbers.insertOne({
        _id: new ObjectId(),
        random: number.random,
        count: number.count
    });
});
