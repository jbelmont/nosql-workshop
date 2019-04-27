"use strict";

// Enables or disables the features that persist data incompatible with earlier versions of MongoDB. 
// You can only issue the setFeatureCompatibilityVersion against the admin database.
db.adminCommand({ setFeatureCompatibilityVersion: "4.0" });

// Start a session.
var session = db.getMongo().startSession( { readPreference: { mode: "primary" } } );

var employeesCollection = session.getDatabase("hr").employees;

// Start a transaction
session.startTransaction({ 
    readConcern: { level: "snapshot" }, 
    writeConcern: { w: "majority" } 
});

// Operations inside the transaction
try {
   employeesCollection.updateOne( { employee: 3 }, { $set: { status: "Inactive" } } );
} catch (error) {
   // Abort transaction on error
   session.abortTransaction();
   throw error;
}

// Commit the transaction using write concern set at transaction start
session.commitTransaction();

session.endSession();
