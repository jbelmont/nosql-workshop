NoSQL Workshop - Mongo Replication

## Sections:

* [Replica Set Members](#replica-set-members)
* [Replica Set Oplog](#replica-set-oplog)
* [Replica Set Data Synchronization](#replica-set-data-synchronization)
* [Replica Set Deployment Architectures](#replica-set-deployment-architectures)
* [Replica Set High Availability](#replica-set-high-availability)
* [Replica Set Read and Write Semantics](#replica-set-read-and-write-semantics)
* [Replica Set Deployment Tutorials](#replica-set-deployment-tutorials)
* [Member Configuration Tutorials](#member-configuration-tutorials)
* [Replica Set Maintenance Tutorials](#replica-set-maintenance-tutorials)
* [Replication Reference](#replication-reference)
* [Bread Crumb Navigation](#bread-crumb-navigation)

#### Replica Set Members

[Replica Set Members](https://docs.mongodb.com/manual/core/replica-set-members/)

> A replica set in MongoDB is a group of mongod processes that provide redundancy and high availability. The members of a replica set are:

###### Primary.

The primary receives all write operations.

[Primary](https://docs.mongodb.com/manual/core/replica-set-members/#primary)

> The primary is the only member in the replica set that receives write operations. MongoDB applies write operations on the primary and then records the operations on the primary’s oplog. Secondary members replicate this log and apply the operations to their data sets.

###### Secondaries

> Secondaries replicate operations from the primary to maintain an identical data set. Secondaries may have additional configurations for special usage profiles. For example, secondaries may be non-voting or priority 0.

[Secondaries](https://docs.mongodb.com/manual/core/replica-set-members/#secondaries)

> A secondary maintains a copy of the primary’s data set. To replicate data, a secondary applies operations from the primary’s oplog to its own data set in an asynchronous process. [1] A replica set can have one or more secondaries.

> The following three-member replica set has two secondary members. The secondaries replicate the primary’s oplog and apply the operations to their data sets.

###### Arbiter

[Arbiter](https://docs.mongodb.com/manual/core/replica-set-members/#arbiter)

> An arbiter does not have a copy of data set and cannot become a primary. Replica sets may have arbiters to add a vote in elections for primary. Arbiters always have exactly 1 election vote, and thus allow replica sets to have an uneven number of voting members without the overhead of an additional member that replicates data.

#### Replica Set Oplog

[Replica Set Oplog](https://docs.mongodb.com/manual/core/replica-set-oplog/#replica-set-oplog)

> The oplog (operations log) is a special capped collection that keeps a rolling record of all operations that modify the data stored in your databases.

> MongoDB applies database operations on the primary and then records the operations on the primary’s oplog. The secondary members then copy and apply these operations in an asynchronous process. All replica set members contain a copy of the oplog, in the local.oplog.rs collection, which allows them to maintain the current state of the database.

###### Oplog Size

> When you start a replica set member for the first time, MongoDB creates an oplog of a default size if you do not specify the oplog size.

The oplog is used in:

* Replication
* Capped Collections

The oplog (Operation Log) stores documents and is different than a normal collection.

Here is a screenshot of the primary replica set and the looking at the local database which stores the oplog collection:

![scripts/mongodb-oplog-collection.png](../scripts/mongodb-oplog-collection.png)

We can use tools such as mongodump with the oplog collection like this as well:

```bash
mongodump --host localhost:30021 -d local -c oplog.rs
```

Now since we created a dump of our collection and we can then use the bsondump command to get a dump of the contents of the collection like this:

`bsondump dump/local/oplog.rs.bson`

###### Tailing oplog in mongo shell

First let us make sure that we have a 3 node replica set running with:

`docker-compose up`

Then we can get into the 3 node replica set with the following commands:

```bash
mongo localhost:30021
```

Next we can tail the current oplog with this script that I wrote:

```js
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
```

This will print out a bson dump like this:

```json
{
	"ts" : Timestamp(1559486835, 1),
	"h" : NumberLong("454046473856700557"),
	"v" : 2,
	"op" : "n",
	"ns" : "",
	"wall" : ISODate("2019-06-02T14:47:15.554Z"),
	"o" : {
		"msg" : "initiating set"
	}
}
{
	"ts" : Timestamp(1559486847, 1),
	"t" : NumberLong(1),
	"h" : NumberLong("5764067233368327899"),
	"v" : 2,
	"op" : "n",
	"ns" : "",
	"wall" : ISODate("2019-06-02T14:47:27.586Z"),
	"o" : {
		"msg" : "new primary"
	}
}
..............
{
	"ts" : Timestamp(1559487024, 1),
	"t" : NumberLong(1),
	"h" : NumberLong("-7434890826388536737"),
	"v" : 2,
	"op" : "i",
	"ns" : "nosql_workshop.contacts",
	"ui" : UUID("86341e4e-ee04-4f33-84b2-0661430eca74"),
	"wall" : ISODate("2019-06-02T14:50:24.617Z"),
	"o" : {
		"_id" : ObjectId("5cf3e230d62c53ce2bf684e3"),
		"name" : "heroes"
	}
}
true
```

We can continually run the script: `load("scripts/tail-oplog.js")` 

#### Replica Set Data Synchronization

Please read more about [Replica Set Data Synchronization on mongodb docs](https://docs.mongodb.com/manual/core/replica-set-sync/)

#### Replica Set Deployment Architectures

Please read more about [Replica Set Deployment Architectures](https://docs.mongodb.com/manual/core/replica-set-architectures/)

#### Replica Set High Availability

Please read more about [Replica Set High Availability](https://docs.mongodb.com/manual/core/replica-set-high-availability/)

#### Replica Set Read and Write Semantics

Please read more about [Replica Set Read and Write Semantics](https://docs.mongodb.com/manual/core/replica-set-high-availability/)

#### Replica Set Deployment Tutorials

###### Deploy a Replica Set

[Deploy a Replica Set](https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)

Configure a three-member replica set for production systems.

We already configured a 3 node replica set in the previous section in change stream.

*We are using docker to orchestrate 3 separate containers and have already configured a primary and 2 secondaries*

###### Deploy a Replica Set for Testing and Development

[Deploy a Replica Set for Testing and Development](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/)

Configure a three-member replica set for either development or testing systems.

###### Deploy a Geographically Redundant Replica Set

[Deploy a Geographically Redundant Replica Set](https://docs.mongodb.com/manual/tutorial/deploy-geographically-distributed-replica-set/)

Create a geographically redundant replica set to protect against location-centered availability limitations (e.g. network and power interruptions).

###### Add an Arbiter to Replica Set

[Add an Arbiter to Replica Set](https://docs.mongodb.com/manual/tutorial/add-replica-set-arbiter/)

Add an arbiter give a replica set an odd number of voting members to prevent election ties.

Let us add another docker container with the following command in the terminal:

```bash
docker run --name localmongo4 --hostname mongoarbiter1 --net=nosql-workshop_default -p 30024:27017 --expose=27017 -d mongo:4.0.5 --replSet "rs0"
```

Now let us go into the primary and add the following arbiter:

```bash
mongo localhost:30024
```

Then we can add an arbiter like this:

```bash
rs0:PRIMARY> rs.addArb("localmongo4:27017")
{
	"ok" : 1,
	"operationTime" : Timestamp(1559526689, 1),
	"$clusterTime" : {
		"clusterTime" : Timestamp(1559526689, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	}
}
```

We can validate that an arbiter was added with the status command:

```bash
rs.status().members.filter(function(node) { return node.stateStr === "ARBITER" })
[
	{
		"_id" : 103,
		"name" : "localmongo4:27017",
		"health" : 1,
		"state" : 7,
		"stateStr" : "ARBITER",
		"uptime" : 395,
		"lastHeartbeat" : ISODate("2019-06-03T01:58:03.580Z"),
		"lastHeartbeatRecv" : ISODate("2019-06-03T01:58:03.580Z"),
		"pingMs" : NumberLong(0),
		"lastHeartbeatMessage" : "",
		"syncingTo" : "",
		"syncSourceHost" : "",
		"syncSourceId" : -1,
		"infoMessage" : "",
		"configVersion" : 80652
	}
]
```

###### Convert a Standalone to a Replica Set

[Convert a Standalone to a Replica Set](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/)

Convert an existing standalone mongod instance into a three-member replica set.

###### Add Members to a Replica Set

[Add Members to a Replica Set](https://docs.mongodb.com/manual/tutorial/expand-replica-set/)

Add a new member to an existing replica set.

Let us add another member to the replica set with the following command:

```bash
docker run --name localmongo5 --hostname mongonode5 --net=nosql-workshop_default -p 30025:27017 -d mongo:4.0.5 --replSet rs0
```

We can now add a new member in the primary member of the replica set like this:

```bash
rs0:PRIMARY> rs.add("localmongo5:27017")
{
	"ok" : 1,
	"operationTime" : Timestamp(1559527357, 1),
	"$clusterTime" : {
		"clusterTime" : Timestamp(1559527357, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	}
}
```

We can confirm that a new secondary was added to the replicaset with the following command:

```bash
rs0:PRIMARY> rs.status().members.filter(function(node) { return node.name === "localmongo5:27017" })
[
	{
		"_id" : 104,
		"name" : "localmongo5:27017",
		"health" : 1,
		"state" : 2,
		"stateStr" : "SECONDARY",
		"uptime" : 85,
		"optime" : {
			"ts" : Timestamp(1559527432, 1),
			"t" : NumberLong(1)
		},
		"optimeDurable" : {
			"ts" : Timestamp(1559527432, 1),
			"t" : NumberLong(1)
		},
		"optimeDate" : ISODate("2019-06-03T02:03:52Z"),
		"optimeDurableDate" : ISODate("2019-06-03T02:03:52Z"),
		"lastHeartbeat" : ISODate("2019-06-03T02:04:01.626Z"),
		"lastHeartbeatRecv" : ISODate("2019-06-03T02:04:02.853Z"),
		"pingMs" : NumberLong(0),
		"lastHeartbeatMessage" : "",
		"syncingTo" : "172.24.0.4:27017",
		"syncSourceHost" : "172.24.0.4:27017",
		"syncSourceId" : 100,
		"infoMessage" : "",
		"configVersion" : 80653
	}
]
```

###### Remove Members from Replica Set

[Remove Members from Replica Set](https://docs.mongodb.com/manual/tutorial/remove-replica-set-member/)

Remove a member from a replica set.

We can use the following command to remove our new secondary member like this:

```bash
rs0:PRIMARY> rs.remove("localmongo5:27017")
{
	"ok" : 1,
	"operationTime" : Timestamp(1559527508, 1),
	"$clusterTime" : {
		"clusterTime" : Timestamp(1559527508, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	}
}
```

###### Replace a Replica Set Member

[Replace a Replica Set Member](https://docs.mongodb.com/manual/tutorial/replace-replica-set-member/)

Update the replica set configuration when the hostname of a member’s corresponding mongod instance has changed.

#### Member Configuration Tutorials

Content

#### Replica Set Maintenance Tutorials

Content

#### Replication Reference

Content

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB Change Streams](./mongodb_change_streams.md) | [MongoDB Sharding](./mongodb_sharding.md) →
