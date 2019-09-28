"use strict";

db = connect("localhost:27017/nosql_workshop");

db.numbers.find({}).forEach(num => print(num.val));
