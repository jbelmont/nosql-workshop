"use strict";

let db = connect("localhost:27017/nosql_workshop");

let mapFunc = function() {
    this.items.forEach(function(item) {
        var value = {
            count: 1,
            qty: item.qty
        };
        emit(item.sku, value);
    });
};

let reduceFunc = function(keyCustId, countObjVals) {
    let reducedVal = {
        count: 0,
        qty: 0
    };

    for (let index = 0; index < countObjVals.length; index++) {
        reducedVal.count += countObjVals[index].count;
        reducedVal.qty += countObjVals[index].qty;
    }

    return reducedVal;
};

let finalizeFunc = function(key, reducedVal) {
    reducedVal.avg = reducedVal.qty / reducedVal.count;
    
    return reducedVal;
}

const query = {
    out: {
        merge: "map_reduce_example"
    },
    query: {
        ord_date: {
            $gt: new Date('01/01/2012')
        },
        finalize: finalizeFunc
    }
};

db.ordersv2.mapReduce(
    mapFunc,
    reduceFunc,
    query
);