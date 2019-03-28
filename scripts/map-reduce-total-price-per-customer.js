"use strict";

let db = connect("localhost:27017/nosql_workshop");

let mapFunc = function() {
    emit(this.cust_id, this.price);
};

let reduceFunc = function(keyCustId, valuesPrices) {
    return Array.sum(valuesPrices);
};

db.ordersv2.mapReduce(
    mapFunc,
    reduceFunc,
    { out: "map_reduce_example" }
);