NoSQL Workshop - Mongo Sharding

## Sections:

* [Sharding Overview](#sharding-overview)
* [Sharded Cluster Components](#sharded-cluster-components)
* [Shard Keys](#shard-keys)
* [Hashed Sharding](#hashed-sharding)
* [Ranged Sharding](#ranged-sharding)
* [Zones](#zones)
* [Data Partitioning with Chunks](#data-partitioning-with-chunks)
* [Balancer](#balancer)
* [Administration](#administration)
* [Sharding Reference](#sharding-reference)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## Sharding Overview

> Sharding is a method for distributing data across multiple machines. MongoDB uses sharding to support deployments with very large data sets and high throughput operations.

> Database systems with large data sets or high throughput applications can challenge the capacity of a single server. For example, high query rates can exhaust the CPU capacity of the server. Working set sizes larger than the system’s RAM stress the I/O capacity of disk drives.

#### Sharded Cluster Components

Please read more about [Sharded Cluster Components](https://docs.mongodb.com/manual/core/sharded-cluster-components/)

#### Shard Keys

Please read more about [Shard Keys](https://docs.mongodb.com/manual/core/sharding-shard-key/)

#### Hashed Sharding

Please read more about [Hashed Sharding](https://docs.mongodb.com/manual/core/hashed-sharding/)

#### Ranged Sharding

Please read more about [Ranged Sharding](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-ranged-sharding/)

#### Zones

Please read more about [Zones](https://docs.mongodb.com/manual/core/zone-sharding/)

#### Data Partitioning with Chunks

Please read more about [Data Partitioning with Chunks](https://docs.mongodb.com/manual/tutorial/modify-chunk-size-in-sharded-cluster/)

#### Balancer

Please read more about [Balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/)

#### Administration

Please read more about [Administration](https://docs.mongodb.com/manual/administration/sharded-cluster-administration/)

#### Sharding Reference

Please read more about [Sharding Reference](https://docs.mongodb.com/manual/reference/sharding/)

#### Setup 3 Node Replica set and 3 Shards with docker-compose

Here is the `docker-compose.sharding.yml` file that we will use:

```yml
version: "2"

services:
  
  nsqlmongocfg1:
    container_name: nsqlmongocfg1
    image: "mongo:4.0.5"
    command: mongod --configsvr --replSet mongocfg --bind_ip_all --port 27019
    ports:
      - "27021:27019"
    volumes:
      - ./data/mongocfg:/data/db

  nsqlmongocfg2:
    container_name: nsqlmongocfg2
    image: "mongo:4.0.5"
    command: mongod --configsvr --replSet mongocfg --bind_ip_all --port 27019
    ports:
      - "27022:27019"
    volumes:
      - ./data/mongocfg:/data/db

  nsqlmongocfg3:
    container_name: nsqlmongocfg3
    image: "mongo:4.0.5"
    command: mongod --configsvr --replSet mongocfg --bind_ip_all --port 27019
    ports:
      - "27023:27019"
    volumes:
      - ./data/mongocfg:/data/db
  
  nosqlmongoshard1:
    container_name: nosqlmongoshard1
    image: "mongo:4.0.5"
    command: mongod --shardsvr --replSet mongoshard --bind_ip_all --port 27018
    ports:
      - "27018:27018"

  nosqlmongoshard2:
    container_name: nosqlmongoshard2
    image: "mongo:4.0.5"
    command: mongod --shardsvr --replSet mongoshard --bind_ip_all --port 27018
    ports:
      - "27019:27018"

  nosqlmongoshard3:
    container_name: nosqlmongoshard3
    image: "mongo:4.0.5"
    command: mongod --shardsvr --replSet mongoshard --bind_ip_all --port 27018
    ports:
      - "27020:27018"
  
  mongoserver:
    container_name: mongoserver
    image: "mongo:4.0.5"
    command: mongos --configdb mongocfg/nsqlmongocfg1:27019,nsqlmongocfg2:27019,nsqlmongocfg3:27019 --bind_ip_all
    ports:
      - "27017:27017"
```

You can run it like this in your shell:

```bash
docker-compose -f docker-compose.sharding.yml up
```

This will spin up the following containers:

```bash
> docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                 NAMES
bf605977aed0        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:27017->27017/tcp              mongoserver
ddf3030a060b        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        27017/tcp, 0.0.0.0:27018->27018/tcp   nosqlmongoshard1
b03397e2d6ce        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        27017/tcp, 0.0.0.0:27023->27019/tcp   nsqlmongocfg3
dc5f3d3e4be8        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        27017/tcp, 0.0.0.0:27020->27018/tcp   nosqlmongoshard3
fc686ddc59a9        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        27017/tcp, 0.0.0.0:27022->27019/tcp   nsqlmongocfg2
e3bc74065947        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        27017/tcp, 0.0.0.0:27019->27018/tcp   nosqlmongoshard2
c8b0a91c0e3e        mongo:4.0.5         "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        27017/tcp, 0.0.0.0:27021->27019/tcp   nsqlmongocfg1
```

Now run the following `init-sharding.sh` shell script that looks like this:

```bash
#!/bin/bash

echo "Initializing mongo configuration"
CFG_SCRIPT="rs.initiate({_id: \"mongocfg\",configsvr: true, members: [{ _id : 0, host : \"nsqlmongocfg1:27019\" },{ _id : 1, host : \"nsqlmongocfg2:27019\" },{ _id : 2, host : \"nsqlmongocfg3:27019\" }]}); rs.status();"
docker exec -it nsqlmongocfg1 sh -c "echo '${CFG_SCRIPT}' | mongo --port 27019"

sleep 2

echo "Initializing mongo shard"
SHARD_SCRIPT="rs.initiate({_id : \"mongoshard\",members: [{ _id : 0, host : \"nosqlmongoshard1:27018\" },{ _id : 1, host : \"nosqlmongoshard2:27018\" },{ _id : 2, host : \"nosqlmongoshard3:27018\" }]}); rs.status();"
docker exec -it nosqlmongoshard1 sh -c "echo '${SHARD_SCRIPT}' | mongo --port 27018"

sleep 2

echo "Intializing mongos (mongo server)"
docker exec -it mongoserver sh -c "echo \"sh.addShard('mongoshard/nosqlmongoshard1:27018');sh.addShard('mongoshard/nosqlmongoshard2:27018');sh.addShard('mongoshard/nosqlmongoshard3:27018')\" | mongo "
```

You run the shell script like this in the root of the repository:

`sh ./init-sharding.sh`

You may have to execute the shell script multiple times or you may need to do this in your shell:

```bash
docker exec -it mongoserver sh -c "echo \"sh.addShard('mongoshard/nosqlmongoshard1:27018');sh.addShard('mongoshard/nosqlmongoshard2:27018');sh.addShard('mongoshard/nosqlmongoshard3:27018')\" | mongo "
```

*It takes a bit of time to get all of the containers running and synchronized with each other*

###### List shards from the running mongo server

```js
> mongo localhost:27017
MongoDB shell version v4.0.5
connecting to: mongodb://localhost:27017/test?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("6789263a-bf28-4ebb-82d9-f48896fc6cb8") }
MongoDB server version: 4.0.5
Server has startup warnings:
2019-09-14T16:23:25.348+0000 I CONTROL  [main]
2019-09-14T16:23:25.348+0000 I CONTROL  [main] ** WARNING: Access control is not enabled for the database.
2019-09-14T16:23:25.348+0000 I CONTROL  [main] **          Read and write access to data and configuration is unrestricted.
2019-09-14T16:23:25.348+0000 I CONTROL  [main]
mongos> db.adminCommand( { listShards : 1 } )
{
	"shards" : [
		{
			"_id" : "mongoshard",
			"host" : "mongoshard/nosqlmongoshard1:27018,nosqlmongoshard2:27018,nosqlmongoshard3:27018",
			"state" : 1
		}
	],
	"ok" : 1,
	"operationTime" : Timestamp(1568478915, 1),
	"$clusterTime" : {
		"clusterTime" : Timestamp(1568478915, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	}
}
mongos>
```

###### Shard status command

```js
sh.status()
--- Sharding Status ---
  sharding version: {
  	"_id" : 1,
  	"minCompatibleVersion" : 5,
  	"currentVersion" : 6,
  	"clusterId" : ObjectId("5d7d1417f6ca77712e3e2e62")
  }
  shards:
        {  "_id" : "mongoshard",  "host" : "mongoshard/nosqlmongoshard1:27018,nosqlmongoshard2:27018,nosqlmongoshard3:27018",  "state" : 1 }
  active mongoses:
        "4.0.5" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours:
                No recent migrations
  databases:
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                mongoshard	1
                        { "_id" : { "$minKey" : 1 } } -->> { "_id" : { "$maxKey" : 1 } } on : mongoshard Timestamp(1, 0)

mongos>
```

###### Please look at the rest of the running containers with `docker ps` command

*Port 27017 ==> Mongo Server*

*Ports: 27018,27019,27020 ==> Mongo Shards (Primary, Secondary, Secondary)*

*Ports: 27021,27022,27023 ==> Mongo Config Servers (Primary, Secondary, Secondary)*

###### Connecting to each mongo instance

To connect to the mongo server do the following:

```bash
mongo localhost:27017
```

To connect to a mongo shard do the following:

```bash
mongo localhost:27018
# or 
mongo localhost:27019
# or
mongo localhost:27020
```

To connect to a mongo config server do the following:

```bash
mongo localhost:27021
# or 
mongo localhost:27022
# or
mongo localhost:27023
```

Please check out the official [mongodb sharding administration guide for more info](https://docs.mongodb.com/manual/administration/sharded-cluster-administration/)

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB Replication](./mongodb_replication.md) | [MongoDB Administration](./mongodb_administration.md) →
