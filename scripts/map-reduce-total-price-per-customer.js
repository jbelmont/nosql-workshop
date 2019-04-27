"use strict";

var db = connect("localhost:27017/nosql_workshop");

var mapFunc = function() {
    emit(this.cust_id, this.price);
};

var reduceFunc = function(keyCustId, valuesPrices) {
    return Array.sum(valuesPrices);
};

db.ordersv2.mapReduce(
    mapFunc,
    reduceFunc,
    { out: "map_reduce_example" }
);
