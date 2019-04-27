"use strict";

// equivalent for "use <db>" command in mongo shell
var db = db.getSiblingDB('nosql_workshop');
 
// print the collections present in nosql_workshop db
print("\nshow_collections script:\n")
print(db.getCollectionNames());
