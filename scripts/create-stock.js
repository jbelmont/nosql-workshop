"use strict";

var mongoConnections = {
    CONNECTION_STRING: CONNECTION_STRING,
    DATABASE: "nosql_workshop"
};

var CONNECTION_STRING = "mongodb://localhost:27017/nosql_workshop?replicaSet=rs0";

var conn = new Mongo(mongoConnections.CONNECTION_STRING);
var db = conn.getDB(mongoConnections.DATABASE);
var collection = db.stock;
var updatedQuantity = 1;

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}

function update() {
  sleepFor(1000);
  var res = collection.update({quantity:{$gt:10}}, {$inc: {quantity: -Math.floor(Math.random() * 10)}}, {multi: true});
  print(res)
  var updatedQuantity = res.nMatched + res.nModified;
}

while (updatedQuantity > 0) {
  update();
}
