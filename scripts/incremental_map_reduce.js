"use strict";

let db = connect("localhost:27017/nosql_workshop");

let mapFunc = function() {
    let key = this.userid;
    let value = {
        user_id: this.user_id,
        total_time: this.length,
        count: 1,
        avg_time: 0
    };
    emit(key, value);
};

let reduceFunc = function(key, values) {
    let reducedObject = {
        user_id: key,
        total_time: 0,
        count: 0,
        avg_time: 0
    };

    for (let i = 0; i < values.length; i++) {
        reducedObject.total_time += values[i].total_time;
        reducedObject.count += values[i].count;
    }

    return reducedObject;
};

let finalizeFunc = function(key, reducedVal) {
    if (reducedVal.count > 0) {
        reducedVal.avg_time = reducedVal.total_time / reducedVal.count;
    }

    return reducedVal;
}

let query = {
    out: "session_stat",
    finalize: finalizeFunc
};

db.sessions.mapReduce(
    mapFunc,
    reduceFunc,
    query
);