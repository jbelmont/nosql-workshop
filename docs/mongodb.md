NoSQL Workshop - MongoDB

## Sections:

* [What is MongoDB](#what-is-mongodb)
* [MongoDB Features](#mongodb-features)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## What is MongoDB

> MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL).

## MongoDB Features

####  Ad hoc queries

> MongoDB supports field, range query, and regular expression searches. Queries can return specific fields of documents and also include user-defined JavaScript functions. Queries can also be configured to return a random sample of results of a given size.

####  Indexing

> Fields in a MongoDB document can be indexed with primary and secondary indices.

#### Replication

> MongoDB provides high availability with replica sets. A replica set consists of two or more copies of the data. Each replica set member may act in the role of primary or secondary replica at any time. All writes and reads are done on the primary replica by default. Secondary replicas maintain a copy of the data of the primary using built-in replication. When a primary replica fails, the replica set automatically conducts an election process to determine which secondary should become the primary. Secondaries can optionally serve read operations, but that data is only eventually consistent by default.

#### Load balancing

> MongoDB scales horizontally using sharding. The user chooses a shard key, which determines how the data in a collection will be distributed. The data is split into ranges (based on the shard key) and distributed across multiple shards. (A shard is a master with one or more replicas.). Alternatively, the shard key can be hashed to map to a shard – enabling an even data distribution.

> MongoDB can run over multiple servers, balancing the load or duplicating data to keep the system up and running in case of hardware failure.

#### File storage

> MongoDB can be used as a file system, called GridFS, with load balancing and data replication features over multiple machines for storing files.

> This function, called grid file system, is included with MongoDB drivers. MongoDB exposes functions for file manipulation and content to developers. GridFS can be accessed using mongofiles utility or plugins for Nginx and lighttpd. GridFS divides a file into parts, or chunks, and stores each of those chunks as a separate document.

#### Aggregation

> MongoDB provides three ways to perform aggregation: the aggregation pipeline, the map-reduce function, and single-purpose aggregation methods.

> Map-reduce can be used for batch processing of data and aggregation operations. But according to MongoDB's documentation, the Aggregation Pipeline provides better performance for most aggregation operations.

> The aggregation framework enables users to obtain the kind of results for which the SQL GROUP BY clause is used. Aggregation operators can be strung together to form a pipeline – analogous to Unix pipes. The aggregation framework includes the $lookup operator which can join documents from multiple documents, as well as statistical operators such as standard deviation.

#### Server-side JavaScript execution

> JavaScript can be used in queries, aggregation functions (such as MapReduce), and sent directly to the database to be executed.

#### Capped collections

> MongoDB supports fixed-size collections called capped collections. This type of collection maintains insertion order and, once the specified size has been reached, behaves like a circular queue.

#### Transactions

> Support for multi-document ACID transactions was added to MongoDB with the General Availability of the 4.0 release in June 2018.

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Graph Database](./graph-database.md) | [BSON Specification](./bson-specification.md) →
