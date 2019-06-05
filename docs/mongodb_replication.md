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

###### Adjust Priority for Replica Set Member

[Adjust Priority for Replica Set Member](https://docs.mongodb.com/manual/tutorial/adjust-replica-set-member-priority/)

Let use change the priority in the replica set:

First get into the replica set like this:

```bash
docker exec -it localmongo1 mongo
```

Next we need to get the configuration of the replica set and adjust priorities:

```bash
cfg = rs.conf()

cfg.members[0].priority = 0.5
cfg.members[1].priority = 2
cfg.members[2].priority = 2

rs.reconfig(cfg)
```

Notice that we issue a reconfig for the replica sets with our updated priorities.

This will initiate an election and either member 1 or 2 will be elected as the new primary.

We can find out by issuing the `rs.status()` command and in our case member 2 was elected the new primary.

###### Prevent Secondary from Becoming Primary

[Prevent Secondary from Becoming Primary](https://docs.mongodb.com/manual/tutorial/configure-secondary-only-replica-set-member/)

> In a replica set, by default all secondary members are eligible to become primary through the election process. You can use the priority to affect the outcome of these elections by making some members more likely to become primary and other members less likely or unable to become primary.

> Secondaries that cannot become primary are also unable to trigger elections. In all other respects these secondaries are identical to other secondaries.

> To prevent a secondary member from ever becoming a primary in a failover, assign the secondary a priority of 0, as described here. For a detailed description of secondary-only members and their purposes, see Priority 0 Replica Set Members.

Let us get the configuration file for the replica set and then make one secondary inelible for primary:

```bash
cfg = rs.conf()
cfg.members[1].priority = 0
rs.reconfig(cfg)
```

###### Configure a Hidden Replica Set Member

[Configure a Hidden Replica Set Member](https://docs.mongodb.com/manual/tutorial/configure-a-hidden-replica-set-member/#configure-a-hidden-replica-set-member)

> Hidden members are part of a replica set but cannot become primary and are invisible to client applications. Hidden members may vote in elections. For more information on hidden members and their uses, see Hidden Replica Set Members.

```bash
cfg = rs.conf()
cfg.members[0].priority = 0
cfg.members[0].hidden = true
rs.reconfig(cfg)
```

*Notice that here we set a field property of hidden to true.*

###### Configure a Delayed Replica Set Member

Please read the following document in mongodb: [configure a delayed replica set member](https://docs.mongodb.com/manual/tutorial/configure-a-delayed-replica-set-member)

> To configure a delayed secondary member, set its members[n].priority value to 0, its members[n].hidden value to true, and its members[n].slaveDelay value to the number of seconds to delay.

```bash
cfg = rs.conf()
cfg.members[0].priority = 0
cfg.members[0].hidden = true
cfg.members[0].slaveDelay = 3600
rs.reconfig(cfg)
```

###### Configure Non-Voting Replica Set Member

Please read the following document in mongodb: [Configure a non voting replica set member](https://docs.mongodb.com/manual/tutorial/configure-a-non-voting-replica-set-member/)

> Non-voting members allow you to add additional members for read distribution beyond the maximum seven voting members.

> To configure a member as non-voting, set both its votes and priority values to 0.

```bash
cfg = rs.conf();
cfg.members[2].votes = 0;
cfg.members[2].priority = 0;
```

Here we configure the 3rd member of the replica set to be a non-voting replica set member

###### Convert a Secondary to an Arbiter

Please read the following document in mongodb: [Convert secondary into arbiter](https://docs.mongodb.com/manual/tutorial/convert-secondary-into-arbiter/)

> If you have a secondary in a replica set that no longer needs to hold data but that needs to remain in the set to ensure that the set can elect a primary, you may convert the secondary to an arbiter using either procedure in this tutorial. Both procedures are operationally equivalent:

> You may operate the arbiter on the same port as the former secondary. In this procedure, you must shut down the secondary and remove its data before restarting and reconfiguring it as an arbiter.

> For this procedure, see Convert Secondary to Arbiter and Reuse the Port Number.

> Run the arbiter on a new port. In this procedure, you can reconfigure the server as an arbiter before shutting down the instance running as a secondary.

> For this procedure, see Convert Secondary to Arbiter Running on a New Port Number.

#### Replica Set Maintenance Tutorials

###### Change the Size of the Oplog

Increase the size of the oplog which logs operations. In most cases, the default oplog size is sufficient.

> This procedure changes the size of the oplog on each member of a replica set using the replSetResizeOplog command, starting with the secondary members before proceeding to the primary. The replSetResizeOplog command only supports the WiredTiger Storage Engine storage engine.

> Perform these steps on each secondary replica set member first. Once you have changed the oplog size for all secondary members, perform these steps on the primary.

[images/mongodb-change-size-of-oplog.png](../images/mongodb-change-size-of-oplog.png)

###### Perform Maintenance on Replica Set Members

Perform maintenance on a member of a replica set while minimizing downtime.

Please read the following mongodb document: [Perform maintence on replica set members](https://docs.mongodb.com/manual/tutorial/perform-maintence-on-replica-set-members/)

###### Force a Member to Become Primary

Force a replica set member to become primary.

Please read the following mongodb document: [Force member to be primary](https://docs.mongodb.com/manual/tutorial/force-member-to-be-primary/)

###### Resync a Member of a Replica Set

Sync the data on a member. Either perform initial sync on a new member or resync the data on an existing member that has fallen too far behind to catch up by way of normal replication.

Please read the following mongodb document: [Resync replica set member](https://docs.mongodb.com/manual/tutorial/resync-replica-set-member/)

###### Configure Replica Set Tag Sets

Assign tags to replica set members for use in targeting read and write operations to specific members.

Please read the follwing mongodb document: [Configure replica set tag sets](https://docs.mongodb.com/manual/tutorial/configure-replica-set-tag-sets/)

###### Reconfigure a Replica Set with Unavailable Members

Reconfigure a replica set when a majority of replica set members are down or unreachable.

Please read the following mongodb document: [Reconfigure replica set with unavailable members](https://docs.mongodb.com/manual/tutorial/reconfigure-replica-set-with-unavailable-members/)

###### Manage Chained Replication

Disable or enable chained replication. Chained replication occurs when a secondary replicates from another secondary instead of the primary.

Please read the following mongodb document: [Manage chained replication](https://docs.mongodb.com/manual/tutorial/manage-chained-replication/)

###### Change Hostnames in a Replica Set

Update the replica set configuration to reflect changes in members’ hostnames.

Please read the following mongodb document: [Change hostnames in a replica set](https://docs.mongodb.com/manual/tutorial/change-hostnames-in-a-replica-set/)

###### Configure a Secondary’s Sync Target

Specify the member that a secondary member synchronizes from.

Please read the following mongodb document: [Configure replica set secondary sync target](https://docs.mongodb.com/manual/tutorial/configure-replica-set-secondary-sync-target/)

#### Replication Reference

Please read the following mongodb document: [Replication](https://docs.mongodb.com/manual/reference/replication/)

*Replication Methods in the mongo Shell*

| Name | Description | 
| --- | --- |
| rs.add() | Adds a member to a replica set. | 
| rs.addArb() | Adds an arbiter to a replica set. | 
| rs.conf() | Returns the replica set configuration document. | 
| rs.freeze() | Prevents the current member from seeking election as primary for a period of time. | 
| rs.help() | Returns basic help text for replica set functions. | 
| rs.initiate() | Initializes a new replica set. | 
| rs.printReplicationInfo() | Prints a report of the status of the replica set from the perspective of the primary. | 
| rs.printSlaveReplicationInfo() | Prints a report of the status of the replica set from the perspective of the secondaries. | 
| rs.reconfig() | Re-configures a replica set by applying a new replica set configuration object. | 
| rs.remove() | Remove a member from a replica set. | 
| rs.slaveOk() | Sets the slaveOk property for the current connection. Deprecated. Use readPref() and Mongo.setReadPref() to set read preference. | 
| rs.status() | Returns a document with information about the state of the replica set. | 
| rs.stepDown() | Causes the current primary to become a secondary which forces an election. | 
| rs.syncFrom() | Sets the member that this replica set member will sync from, overriding the default sync target selection logic. | 

*Replication Database Commands*

| Name | Description | 
| --- | --- |
| applyOps | Internal command that applies oplog entries to the current data set. | 
| isMaster | Displays information about this member’s role in the replica set, including whether it is the master. | 
| replSetAbortPrimaryCatchUp | Forces the elected primary to abort sync (catch up) then complete the transition to primary. | 
| replSetFreeze | Prevents the current member from seeking election as primary for a period of time. | 
| replSetGetConfig | Returns the replica set’s configuration object. | 
| replSetGetStatus | Returns a document that reports on the status of the replica set. | 
| replSetInitiate | Initializes a new replica set. | 
| replSetMaintenance | Enables or disables a maintenance mode, which puts a secondary node in a RECOVERING state. | 
| replSetReconfig | Applies a new configuration to an existing replica set. | 
| replSetResizeOplog | Dynamically resizes the oplog for a replica set member. Available for WiredTiger storage engine only. | 
| replSetStepDown | Forces the current primary to step down and become a secondary, forcing an election. | 
| replSetSyncFrom | Explicitly override the default logic for selecting a member to replicate from. | 

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB Change Streams](./mongodb_change_streams.md) | [MongoDB Sharding](./mongodb_sharding.md) →
