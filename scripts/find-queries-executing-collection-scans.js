"use script";

var db = connect("localhost:27017");

// all queries that execute a COLLSCAN
db.system.profile.find({
    "planSummary":{
        $eq:"COLLSCAN"
    },
    "op" : {
        $eq:"query"
    }
}).sort({
    millis: -1
});
