"use strict";

var db = connect("localhost:27017/nosql_workshop");

// This is good for aggregate queries
db.system.profile.find({
    "command.pipeline": { $exists: true }
},{
    "command.pipeline":1
}).sort({
    $natural:-1
}).pretty();
