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