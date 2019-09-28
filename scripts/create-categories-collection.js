"use strict";

var db = connect("localhost:27017/nosql_workshop");

db.categories.insert( { _id: "Books", path: null } )
db.categories.insert( { _id: "Programming", path: ",Books," } )
db.categories.insert( { _id: "Databases", path: ",Books,Programming," } )
db.categories.insert( { _id: "Languages", path: ",Books,Programming," } )
db.categories.insert( { _id: "MongoDB", path: ",Books,Programming,Databases," } )
db.categories.insert( { _id: "dbm", path: ",Books,Programming,Databases," } )

db.categories.find().sort( { path: 1 } );

db.categories.find( { path: /,Programming,/ } );

db.categories.find( { path: /^,Books,/ } );

db.categories.createIndex( { path: 1 } );
