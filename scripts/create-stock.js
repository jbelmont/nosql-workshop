"use strict";

var mongoConnections = {
    CONNECTION_STRING: CONNECTION_STRING,
    DATABASE: "nosql_workshop"
};

var CONNECTION_STRING = "mongodb://localhost:30021/nosql_workshop?replicaSet=rs0";

conn = new Mongo(mongoConnections.CONNECTION_STRING);
db = conn.getDB(mongoConnections.DATABASE);
collection = db.stock;
var updatedQuantity = 1;

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}

function update() {
  sleepFor(1000);
  res = collection.update({quantity:{$gt:10}}, {$inc: {quantity: -Math.floor(Math.random() * 10)}}, {multi: true});
  print(res)
  updatedQuantity = res.nMatched + res.nModified;
}

while (updatedQuantity > 0) {
  update();
}
