"use strict";

let db = connect("localhost:27017/nosql_workshop");

function indexStats() {
    let adminDB = db.adminCommand({ listDatabases: 1 });

    if (!adminDB.databases) {
        print("There are no databases!");
    }

    adminDB.databases.filter(function(database) {
        return database.name !== "admin" && 
            database.name !== "local" && 
            database.name !== "config" &&
            database.name !== "test";
    }).forEach(function(database) {
        aggregateStatsInformation(db.getSiblingDB(database.name));
    });
}

function aggregateStatsInformation(db) {
    let collectionNames = db.getCollectionNames();

    collectionNames.filter(collection => {
        return db.getCollection(collection).getIndexes().length > 0;
    }).forEach(collection => {
        print(`${collection} collection:`);
        let cursor = db[collection].aggregate([{$indexStats:{}}]);
        let indexSize = db[collection].stats().indexSizes._id_;
        while(cursor.hasNext()) {
            let value = cursor.next();
            printIndexStats(value, indexSize);
        }
    });
}

function printIndexStats(stats, indexSize) {
    print("\nns\tsize\tops\tsince");
    print(
        `${stats.name}\t${indexSize}\t${stats.accesses.ops}\t${stats.accesses.since}`  
    );
}

indexStats();