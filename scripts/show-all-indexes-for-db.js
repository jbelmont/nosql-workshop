"use strict";

let db = connect("localhost:27017/nosql_workshop");

db.getCollectionNames().forEach(function(collection) {
   let indexes = db[collection].getIndexes();
   print("Indexes for " + collection + ":");
   printjson(indexes);
});