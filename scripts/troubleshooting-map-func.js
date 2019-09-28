"use strict";

var db = connect("localhost:27017/nosql_workshop");

var map = function() {
    emit(this.cust_id, this.price);
};

var emit = function(key, value) {
    print("emit");
    print(`key: ${key} value: ${tojson(value)}`);

};

var myDoc = db.ordersv2.findOne({ price: { $gt: 300 } });
map.apply(myDoc);

// Now invoke map with multiple documents
var myCursor = db.ordersv2.find({ price: { $gt: 300 } });

while (myCursor.hasNext()) {
    var doc = myCursor.next();
    print(`document _id = ${tojson(doc._id)}`);
    map.apply(doc);
    print();
}
