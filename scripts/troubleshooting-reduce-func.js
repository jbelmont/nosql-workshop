"use strict";

let db = connect("localhost:27017/nosql_workshop");

let reduceFunction1 = function(keyCustId, valuesPrices) {
    return Array.sum(valuesPrices);
};

let myTestValues = [ 5, 5, 10 ];

print(reduceFunction1('myKey', myTestValues));

let reduceFunction2 = function(keySKU, valuesCountObjects) {
    let reducedValue = { 
        count: 0, 
        qty: 0 
    };

    for (var idx = 0; idx < valuesCountObjects.length; idx++) {
        reducedValue.count += valuesCountObjects[idx].count;
        reducedValue.qty += valuesCountObjects[idx].qty;
    }

    return reducedValue;
};

let myTestObjects = [
    { count: 1, qty: 5 },
    { count: 2, qty: 10 },
    { count: 3, qty: 15 }
];

printjson(reduceFunction2('myKey', myTestObjects));

let values1 = [
    { count: 1, qty: 5 },
    { count: 2, qty: 10 },
    { count: 3, qty: 15 }
];

let values2 = [
    { count: 3, qty: 15 },
    { count: 1, qty: 5 },
    { count: 2, qty: 10 }
];

printjson(reduceFunction2('myKey', values1));
printjson(reduceFunction2('myKey', values2));

var valuesIdempotent = [
    { count: 1, qty: 5 },
    { count: 2, qty: 10 },
    reduceFunction2("myKey", [ { count:3, qty: 15 } ] )
];

var values3 = [
    { count: 1, qty: 5 },
    { count: 2, qty: 10 },
    { count: 3, qty: 15 }
];

printjson(reduceFunction2("myKey", valuesIdempotent));
printjson(reduceFunction2("myKey", values3));