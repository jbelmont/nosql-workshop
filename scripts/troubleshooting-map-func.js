"use strict";

let db = connect("localhost:27017/nosql_workshop");

let map = function() {
    emit(this.cust_id, this.price);
};

let emit = function(key, value) {
    print("emit");
    print(`key: ${key} value: ${tojson(value)}`);

};

let myDoc = db.ordersv2.findOne({ price: { $gt: 300 } });
map.apply(myDoc);

// Now invoke map with multiple documents
let myCursor = db.ordersv2.find({ price: { $gt: 300 } });

while (myCursor.hasNext()) {
    let doc = myCursor.next();
    print(`document _id = ${tojson(doc._id)}`);
    map.apply(doc);
    print();
}