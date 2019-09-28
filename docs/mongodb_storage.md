NoSQL Workshop - Mongo Storage

## Sections:

* [Storage Engines](#storage-engines)
* [Journaling](#journaling)
* [GridFS](#gridfs)
* [MongoDB Storage FAQ](#mongodb-storage-faq)
* [Bread Crumb Navigation](#bread-crumb-navigation)

#### Storage Engines

Please read more about [Storage Engines in the official mongodb documentation](https://docs.mongodb.com/manual/core/storage-engines/)

#### Journaling

Please read more about [Journaling in the official mongodb documentation](https://docs.mongodb.com/manual/core/journaling/)

#### GridFS

Please read more about [GridFS in the official mongodb documentation](https://docs.mongodb.com/manual/core/gridfs/)

#### MongoDB Storage FA

Please read more about [MongoDB Storage FAQ information in the official mongodb documentation](https://docs.mongodb.com/manual/faq/storage/)

#### Personal Notes on Storage

A good article explaining the differences [between MMAPV1 vs WiredTiger](https://www.percona.com/blog/2019/01/03/mongodb-engines-mmapv1-vs-wiredtiger/)

###### Starting mongodb with wiredTiger

`mongod --storageEngine wiredTiger --dbpath="./nosql_workshop/"`

*The key option of note here is `--storageEngine`*

###### Starting in memory storage engine

`mongod --storageEngine inMemory --dbpath <path>`

*Notice that we specified inMemory*

#### GridFS 

> GridFS is a specification for storing and retrieving files that exceed the BSON-document size limit of 16 MB.

###### When to Use GridFS

[When To Use GridFS](https://docs.mongodb.com/manual/core/gridfs/#when-to-use-gridfs)

> In MongoDB, use GridFS for storing files larger than 16 MB.

> In some situations, storing large files may be more efficient in a MongoDB database than on a system-level filesystem.

> If your filesystem limits the number of files in a directory, you can use GridFS to store as many files as needed.
When you want to access information from portions of large files without having to load whole files into memory, you can use GridFS to recall sections of files without reading the entire file into memory.
When you want to keep your files and metadata automatically synced and deployed across a number of systems and facilities, you can use GridFS. When using geographically distributed replica sets, MongoDB can distribute files and their metadata automatically to a number of mongod instances and facilities.

###### Using new golang mongodb driver gridfs example

```go
package main

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/gridfs"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	uri = "mongodb://localhost:30021"
)

func gridFS() {
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Could not setup new mongo client")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	db := client.Database("gridFSTestDB")

	bucket, err := gridfs.NewBucket(db)
	if err != nil {
		log.Fatal("Could not create bucket")
	}

	err = bucket.SetWriteDeadline(time.Now().Add(10 * time.Second))
	if err != nil {
		log.Fatalf("Failed to set write deadline: %v", err)
	}

	byteData := []byte("GridFS, Example for NoSQL Workshop!")
	r := bytes.NewReader(byteData)

	id, err := bucket.UploadFromStream("filename", r)
	if err != nil {
		log.Fatalf("Failed to open upload stream: %v", err)
	}

	fmt.Println(id)
}
```

###### Database statistics query from docs

```js
db.adminCommand("listDatabases").databases.forEach(function (d) {
   mdb = db.getSiblingDB(d.name);
   mdb.getCollectionNames().forEach(function(c) {
      s = mdb[c].stats();
      printjson(s);
   })
})
```

*This script that mongodb docs gives us shows statistics for each collection in each database*

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB Administration](./mongodb_administration.md) | [somewhere](./somewhere.md) →
