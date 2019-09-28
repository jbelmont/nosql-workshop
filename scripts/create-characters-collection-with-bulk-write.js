"use strict";

db = connect("localhost:27017/nosql_workshop");

try {
    db.characters.bulkWrite(
       [
          { insertOne :
             {
                "document" :
                {
                   "_id" : 4, "char" : "Dithras", "class" : "barbarian", "lvl" : 4
                }
             }
          },
          { insertOne :
             {
                "document" :
                {
                   "_id" : 5, "char" : "Taeln", "class" : "fighter", "lvl" : 3
                }
             }
          },
          { updateOne :
             {
                "filter" : { "char" : "Eldon" },
                "update" : { $set : { "status" : "Critical Injury" } }
             }
          },
          { deleteOne :
             { "filter" : { "char" : "Brisbane"} }
          },
          { replaceOne :
             {
                "filter" : { "char" : "Meldane" },
                "replacement" : { "char" : "Tanys", "class" : "oracle", "lvl" : 4 }
             }
          }
       ]
    );
 } catch (e) {
    print(e);
 }
