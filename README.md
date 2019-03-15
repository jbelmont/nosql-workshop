# NoSQL Workshop

A workshop on NoSQL databases such as MongoDb that explores both theory and practice by using MongoDb and Neo4j databases.

* [NoSQL Workshop Gitbook](#api-workshop-gitbook)
* [Workshop Details](#workshop-details)
* [Database Theory](docs/database-theory.md)
    * [Data Modeling](docs/data-modeling.md)
    * [Data Normalization](docs/data-normalization.md)
    * [ACID](docs/acid.md)
    * [CAP Thereom](docs/cap.md)
    * [Base Consistency Model](docs/base-consistency-model.md)
* [NoSQL Databases](docs/nosql-databases.md)
    * [Types of NoSQL Databases](docs/types-of-nosql-databases.md)
    * [Key-Value Database](docs/key-value-database.md)
    * [Column Database](docs/column-database.md)
    * [Document Database](docs/document-database.md)
    * [Graph Database](docs/graph-database.md)
* [MongoDB](docs/mongodb.md)
    * [BSON Specification](docs/bson-specification.md)
    * [BSON Data Types](docs/bson-data-types.md)
    * [Mongo Shell](docs/mongo-shell.md)
    * [Mongo CRUD Operations](docs/mongo-crud-operations.md)
    * [Mongo CRUD Operations Part II](docs/mongo-crud-operations-part2.md)
    * [Mongo CRUD Operations Part III](docs/mongo-crud-operations-part3.md)
    * [Mongo CRUD Concepts](docs/mongo-crud-concepts.md)
    * [MongoDB Aggregation](docs/mongodb-aggregation.md)
    * [MongoDB Data Models](docs/mongodb_data_models.md)
    * [MongoDB Transactions](docs/mongodb_transactions.md)
    * [MongoDB Indexes](docs/mongodb_indexes.md)
    * [MongoDB Security](docs/mongodb_security.md)
    * [MongoDB Change Streams](docs/mongodb_change_streams.md)
    * [MongoDB Replication](docs/mongodb_replication.md)
    * [MongoDB Sharding](docs/mongodb_sharding.md)
    * [MongoDB Administration](docs/mongodb_administration.md)
    * [MongoDB Storage](docs/mongodb_storage.md)

# NoSQL Workshop Gitbook

Here is the gitbook for the [NoSQL Workshop](https://www.marcelbelmont.com/nosql-workshop)

## Workshop Details

### Preparations:

* [Install Docker](https://docs.docker.com/engine/installation/)
* Clone this repo: `git clone https://github.com/jbelmont/nosql-workshop.git`

### Docker Prerequisites

Since Docker leverages the Operating System's virtualization technologies, the install requirements for Docker are specific.

OS X requirements:

- 2010 or newer model with Intel's MMU virtualization
- OS X El Capitan 10.11 or newer

Windows requirements:

- 64-bit Windows
- Windows 10 Pro, Enterprise or Education (not Home, not Windows 7 or 8) to install Hyper-V
- Windows 10 Anniversary Update or better
- Access to your machine's BIOS to turn on virtualization

### Install Mongo Docker Image

Please run the following command to pull the official mongo docker image:

`docker pull mongo:4.0.5`

You can also pull my own docker image which has vim installed:

`docker pull jbelmont/mongo-vim:4.0.5`


### Use the following shell script to get mongo running in your system:

```bash
#! /bin/bash

docker run --name mongo-image-4 \
  --rm \
  -v ~/mongod_data.4.0.5:/data/db \
  -p 27017:27017 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -d mongo:4.0.5
```

### Get into mongo shell

Once you run the above command you should be able to get into running docker container like this in a shell session:

`mongo localhost:27017`
