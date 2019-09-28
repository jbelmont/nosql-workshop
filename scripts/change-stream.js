"use strict";

// Original Code for this is from:
// https://github.com/rlondner/mongodb-node-changestreams-sample/tree/master/shell
// This example is based out of mongodb blog post:
// https://www.mongodb.com/blog/post/an-introduction-to-change-streams

var CONNECTION_STRING = "mongodb://localhost:27017/nosql_workshop?replicaSet=rs0";

var db = connect(CONNECTION_STRING);
var collection = db.stock;

var changeStreamCursor = collection.watch();

pollStream(changeStreamCursor);

//this function polls a change stream and prints out each change as it comes in
function pollStream(cursor) {
  while (!cursor.isExhausted()) {
    if (cursor.hasNext()) {
      var change = cursor.next();
      print(JSON.stringify(change));
    }
  }
  pollStream(cursor);
}
