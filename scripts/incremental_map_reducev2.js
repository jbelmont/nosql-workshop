"use strict";

var db = connect("localhost:27017/nosql_workshop");

var mapFunc = function() {
    var key = this.userid;
    var value = {
        user_id: this.user_id,
        total_time: this.length,
        count: 1,
        avg_time: 0
    };
    emit(key, value);
};

var reduceFunc = function(key, values) {
    var reducedObject = {
        user_id: key,
        total_time: 0,
        count: 0,
        avg_time: 0
    };

    for (var i = 0; i < values.length; i++) {
        reducedObject.total_time += values[i].total_time;
        reducedObject.count += values[i].count;
    }

    return reducedObject;
};

var finalizeFunc = function(key, reducedVal) {
    if (reducedVal.count > 0) {
        reducedVal.avg_time = reducedVal.total_time / reducedVal.count;
    }

    return reducedVal;
}

var query = {
    out: {
        reduce: "session_stat"
    },
    query: {
        ts: {
            $gt: ISODate('2011-11-05 00:00:00')
        }
    },
    finalize: finalizeFunc
};

db.sessions.mapReduce(
    mapFunc,
    reduceFunc,
    query
);
