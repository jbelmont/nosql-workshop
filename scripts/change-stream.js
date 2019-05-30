"use strict";

// Original Code for this is from:
// https://github.com/rlondner/mongodb-node-changestreams-sample/tree/master/shell
// This example is based out of mongodb blog post:
// https://www.mongodb.com/blog/post/an-introduction-to-change-streams

var CONNECTION_STRING = "mongodb://localhost:30021,localhost:30022,localhost:30023/admin?replicaSet=rs0";

var conn = new Mongo(CONNECTION_STRING);
db = conn.getDB("nosql_workshop");
collection = db.stock;

var updateOps = {
  $match: {
    $and: [
      { "updateDescription.updatedFields.quantity": { $lte: 10 } },
      { operationType: "update" }
    ]
  }
};

var changeStreamCursor = collection.watch([updateOps]);

pollStream(changeStreamCursor);

//this function polls a change stream and prints out each change as it comes in
function pollStream(cursor) {
  while (!cursor.isExhausted()) {
    if (cursor.hasNext()) {
      change = cursor.next();
      print(JSON.stringify(change));
    }
  }
  pollStream(cursor);
}
