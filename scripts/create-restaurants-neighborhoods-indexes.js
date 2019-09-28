"use strict";

var db = connect("localhost:27017/nosql_workshop");

db.restaurants.createIndex({ location: "2dsphere" });
db.neighborhoods.createIndex({ geometry: "2dsphere" });
