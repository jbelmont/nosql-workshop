#!/bin/bash

echo "Initializing mongo configuration"
CFG_SCRIPT="rs.initiate({_id: \"mongocfg\",configsvr: true, members: [{ _id : 0, host : \"nsqlmongocfg:27019\" }]}); rs.status();"
docker exec -it nsqlmongocfg sh -c "echo '${CFG_SCRIPT}' | mongo --port 27019"

sleep 2

echo "Initializing mongo shard"
SHARD_SCRIPT="rs.initiate({_id : \"mongoshard\",members: [{ _id : 0, host : \"nosqlmongoshard:27018\" }]}); rs.status();"
docker exec -it nosqlmongoshard sh -c "echo '${SHARD_SCRIPT}' | mongo --port 27018"

sleep 2

echo "Intializing mongos (mongo server)"
docker exec -it mongoserver sh -c "echo \"sh.addShard('mongoshard/nosqlmongoshard:27018');\" | mongo "