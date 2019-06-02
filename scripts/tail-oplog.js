(function() {
    var CONNECTION_STRING = "localhost:30021";
    var mongoConnections = {
        CONNECTION_STRING: CONNECTION_STRING,
        DATABASE: "local"
    };
    var conn = new Mongo(mongoConnections.CONNECTION_STRING);
    var db = conn.getDB(mongoConnections.DATABASE);
    var collection = db.oplog.rs;

    var cursor = collection.find()
        .addOption(DBQuery.Option.tailable)
        .addOption(DBQuery.Option.awaitData);

    // Loop through each entry in the cursor and print contents
    while(cursor.hasNext()) {
        printjson(cursor.next());
    }
}());
