"use strict";

var db = connect("localhost:27017");

// Load the words global array into memory
// var words = [...];
load("./scripts/words.js");

class Large {
    constructor(numberOfDocuments, targetDB, collectionName) {
        this.numberOfDocuments = numberOfDocuments;
        this.targetDB = targetDB;
        this.collectionName = collectionName;
        db = this.setDB(this.targetDB);
        // save this into the constructor method.
        this.words = words;
    }
    help() {
		print('------------------------------------------------------------------------------------------------');
		print('');
        print('Usage:');
        print("Pass in 3 arguments into Large Class:\n\tnumberOfDocuments should be an integer.\n\ttargetDB is the database name.\n\tcollectionName is the name of the collection to insert documents to.")
        print("\tvar collection = new Large(1000000, \"dbName\", \"collName\"");
        print("\tcollection.generateDocuments()")
		print('------------------------------------------------------------------------------------------------');
		
    }
    setDB(targetDB) {
        return db.getSiblingDB(targetDB);
    }
    dropCollection(collectionName) {
        db.getCollection(collectionName).drop();
    }
    generateDocuments() {
        this.dropCollection(this.collectionName);
        this.documents = [];
		for (var i = 0; i < this.numberOfDocuments; i++) {
            this.documents.push({
                _id: new ObjectId(),
                number: i,
                word: this.words[i]
            });
        }
        db.getCollection(this.collectionName).insertMany(this.documents);
	}
}
